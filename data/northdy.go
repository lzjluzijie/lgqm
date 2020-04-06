package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"github.com/lunny/html2md"
	"io"
	"os"
	"text/template"
	"time"
)

/*
处理北朝临高区的数据
数据来源 https://lgqm.gq/thread-1722-1-1.html
*/

type User struct {
	Uid int
	Name string
}

type Post struct {
	Pid      int
	Uid      int
	Content  string

	PostTimeString string `json:"post_time"`

	Username string
	PostTime time.Time
}

type Thread struct {
	Tid          int
	Title        string
	Author       int
	PostCount    int

	PostTimeString string `json:"post_time"`
	LastPostTimeString string `json:"last_post_time"`

	Username string
	PostTime     time.Time
	LastPostTime time.Time
	Posts        []*Post
}

const PostTimeLayout = "2006-1-2 15:04:05"
const LastPostTimeLayout = "2006-1-2 15:04"
const TimeLayout = "2006-01-02 15:04"

const Northdy = `---
aid: 9025
zid: {{ .Tid }}
title: {{ .Title }}
author: {{ .Author }}
---

{{ range .Posts }}

{{ .Username }} 于 {{ .PostTimeString }} 发表评论：

{{ .Content }}

---------
{{ end }}

`

var tc *template.Template

func init() {
	t, err := template.New("northdy").Parse(Northdy)
	if err != nil {
		panic(err)
	}

	tc = t
}

func exec(thread *Thread) {
	f, err := os.Create(fmt.Sprintf("./output/9025/%06d.md", thread.Tid))
	if err != nil {
		panic(err)
	}

	fmt.Println(thread.Title)
	err = tc.Execute(f, thread)

	if err != nil {
		panic(err)
	}
}

func loadUsers() (users map[int]string) {
	f, err := os.Open("user.jsonl")
	if err != nil {
		panic(err)
	}

	r := bufio.NewReader(f)
	users = make(map[int]string)

	for {
		//ReadLine 有问题
		l, err := r.ReadString('\n')
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}

		var user User
		err = json.Unmarshal([]byte(l), &user)
		if err != nil {
			panic(err)
		}

		users[user.Uid] = user.Name
	}

	return
}

func jsonl() (threads []*Thread)  {
	users := loadUsers()

	beijing := time.FixedZone("北京时间", int((8 * time.Hour).Seconds()))

	f, err := os.Open("thread.jsonl")
	if err != nil {
		panic(err)
	}

	r := bufio.NewReader(f)
	threads = make([]*Thread, 0)

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

		t.Username = users[t.Author]

		for _, pts := range t.Posts {
			pt, err := time.ParseInLocation(PostTimeLayout, pts.PostTimeString, beijing)
			if err != nil {
				panic(err)
			}

			pts.PostTime = pt
			pts.Username = users[t.Author]
			if t.Tid == 787250 {
				pts.Content = html2md.Convert(pts.Content)
			}
		}

		//fmt.Println(t.Tid)
		//fmt.Println(t.Title)
		//fmt.Println(t.PostTime)

		threads = append(threads, t)
	}

	return
}

func main() {
	//fmt.Println(loadUsers())
	threads := jsonl()
	fmt.Println(threads[0].Posts[0].Content)
	fmt.Println(html2md.Convert(threads[0].Posts[0].Content))
	exec(threads[0])
}
