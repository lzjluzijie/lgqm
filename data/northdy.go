package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
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
	Posts        []Post
}

const TimeLayout = "2006-1-2 15:04:05"

func main() {
	beijing := time.FixedZone("北京时间", int((8 * time.Hour).Seconds()))

	f, err := os.Open("thread.jsonl")
	if err != nil {
		panic(err)
	}

	r := bufio.NewReader(f)
	for {
		//ReadLine 有问题
		l, err := r.ReadString('\n')
		if err != nil {
			panic(err)
		}
		l = strings.ReplaceAll(l, "&nbsp", " ")
		//fmt.Println(l)

		t := new(Thread)
		err = json.Unmarshal([]byte(l), t)
		if err != nil {
			panic(err)
		}

		// 处理一下
		if t.Title == "已删" || t.Title == "删不掉帖子，编辑了" || t.Title == "“立春”号首任舰长爆照啦" {
			continue
		}

		pt, err := time.ParseInLocation(TimeLayout, t.PostTimeString, beijing)
		if err != nil {
			panic(err)
		}

		t.PostTime = pt

		fmt.Println(t.Title)
		fmt.Println(t.PostTime)
		fmt.Println(t.Posts[0].Uid)
	}
}
