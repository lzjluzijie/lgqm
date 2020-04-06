package main

import (
	"bufio"
	"bytes"
	"encoding/gob"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"
)

/*
处理北朝临高区的数据
数据来源 https://lgqm.gq/thread-1722-1-1.html
*/

type Post struct {
	Pid      int
	Uid      int
	Content  string

	PostTimeString string `json:"post_time"`

	PostTime time.Time
}

type Thread struct {
	Tid          int
	Title        string
	Author       int
	PostCount    int

	PostTimeString string `json:"post_time"`
	LastPostTimeString string `json:"last_post_time"`

	PostTime     time.Time
	LastPostTime time.Time
	Posts        []*Post
}

const PostTimeLayout = "2006-1-2 15:04:05"
const LastPostTimeLayout = "2006-1-2 15:04"

func jsonl()  {
	beijing := time.FixedZone("北京时间", int((8 * time.Hour).Seconds()))

	f, err := os.Open("thread.jsonl")
	if err != nil {
		panic(err)
	}

	r := bufio.NewReader(f)
	threads := make([]*Thread, 0)

	for {
		//ReadLine 有问题
		l, err := r.ReadString('\n')
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		//l = strings.ReplaceAll(l, "&nbsp", " ")
		//fmt.Println(l)

		t := new(Thread)
		err = json.Unmarshal([]byte(l), t)
		if err != nil {
			panic(err)
		}

		// 处理一下
		//if t.Title == "已删" || t.Title == "删不掉帖子，编辑了" || t.Title == "“立春”号首任舰长爆照啦" {
		//	continue
		//}
		if len(t.PostTimeString)<=10 {
			fmt.Println(t.Title)
			continue
		}

		pt, err := time.ParseInLocation(PostTimeLayout, t.PostTimeString, beijing)
		if err != nil {
			panic(err)
		}
		t.PostTime = pt

		lpt, err := time.ParseInLocation(LastPostTimeLayout, t.LastPostTimeString, beijing)
		if err != nil {
			panic(err)
		}
		t.LastPostTime = lpt

		for _, pts := range t.Posts {
			pt, err := time.ParseInLocation(PostTimeLayout, pts.PostTimeString, beijing)
			if err != nil {
				panic(err)
			}

			pts.PostTime = pt
		}

		fmt.Println(t.Title)
		fmt.Println(t.PostTime)

		threads = append(threads, t)
	}

	var buf bytes.Buffer
	enc := gob.NewEncoder(&buf)
	err = enc.Encode(threads)
	if err != nil {
		panic(err)
	}

	fmt.Println(buf.Len())
}

func main() {
	jsonl()
}
