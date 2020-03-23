package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"sort"
	"strings"
	"text/template"
)

type Volume struct {
	Chapters []Chapter
}

type Chapter struct {
	Aid     int
	Zid     int
	Uid	int
	Title   string
	Author  string
	Tags    []string
	Content string
}

const mc = `---
aid: {{ .Aid }}
zid: {{ .Zid }}
uid: {{ .Uid }}
title: {{ printf "%04d.%04d-%s" .Aid .Zid .Title }}
author: {{ .Author }}
tags: {{ range $tag := .Tags }}
 - {{ $tag }}
{{ end }}
---


{{ .Content }}

`

var tc *template.Template

func init()  {
	t,  err := template.New("chapter").Parse(mc)
	if err != nil {
		panic(err)
	}

	tc = t
}

/*
从开篇到被封
*/
func d0() {
	data, err := ioutil.ReadFile("临高启明.txt")
	if err != nil {
		panic(err)
	}

	str := string(data)
	ls := strings.Split(str, "\r\n")
	ts := ""
	var cs []Chapter
	id := 0

	c := make(chan string, 1)

	tc, err := template.New("chapter").Parse(mc)
	if err != nil {
		panic(err)
	}

	for _, l := range ls {
		//fmt.Println([]byte(l))
		if l == "" {
			ts += "\n"
			continue
		}

		if len(l) >= 4 && l[:4] == "    " {
			ts += l[4:] + "\n"
			continue
		}

		if id != 0 {
			c <- ts
			ts = ""
		}
		id++

		fmt.Println(strings.Replace(l[1:], "?", " ", -1))
		go func(id int, title string) {
			s := <-c

			cs = append(cs, Chapter{
				Aid:     1,
				Zid:     id,
				Title:   title,
				Content: s,
			})
		}(id, strings.Replace(l[1:], "?", " ", -1))
	}

	//fmt.Println(cs)

	for _, c := range cs {
		f, err := os.Create(fmt.Sprintf("./zw/%04d.md", c.Zid))
		if err != nil {
			panic(err)
		}

		err = tc.Execute(f, c)
		if err != nil {
			panic(err)
		}
	}
}

func output(chapter Chapter) {
	f, err := os.Create(fmt.Sprintf("./output/%04d/%04d.md", chapter.Aid, chapter.Zid))
	if err != nil {
		panic(err)
	}

	fmt.Printf("%v\n", chapter.Title)
	err = tc.Execute(f, chapter)

	if err != nil {
		panic(err)
	}
}

/*
https://github.com/lzjluzijie/lingaoqiming.github.com
从开篇到第七章110
*/
func d1() {
	uid := 1

	files, err := ioutil.ReadDir("./lingaoqiming.github.com/_posts")
	if err != nil {
		panic(err)
	}

	var cs []Chapter

	for _, file := range files {
		var y, m, d, a, b int
		_, err := fmt.Sscanf(file.Name(), "%d-%d-%d-%d-%d.md", &y, &m, &d, &a, &b)
		if err != nil {
			panic(err)
		}
		b /= 100

		//非正文先跳过
		if a == 0 {
			continue
		}

		data, err := ioutil.ReadFile("./lingaoqiming.github.com/_posts/" + file.Name())
		if err != nil {
			panic(err)
		}

		//从第八行开始是正文
		s := strings.SplitN(string(data), "\r\n", 8)

		//var h, t string
		//fmt.Println([]byte(s[2]))
		//_, err = fmt.Sscanf(s[2], "title: 第%s节 %s\n", &h, &t)
		//if err != nil {
		//  panic(err)
		//}

		//fmt.Println(s[2])
		ts := strings.Split(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(s[2], " ", " "), "　", " "), "\n", ""), " ")
		//fmt.Println(ts)

		c := Chapter{
			Aid:     a,
			Zid:     b,
			Title:   ts[2],
			Author:  "吹牛者",
			Tags:    []string{"正文"},
			Content: strings.ReplaceAll(s[7], "　　", "  "),
		}

		cs = append(cs, c)
	}

	sort.SliceStable(cs, func(i, j int) bool { return cs[i].Aid<cs[j].Aid || (cs[i].Aid==cs[j].Aid && cs[i].Zid<cs[j].Zid)})

	for _, c := range cs{
		c.Uid = uid
		output(c)
		uid++
	}
}

/*
从第七章广州攻略篇111到结束
*/
func d2() {
	uid := 1915

	data, err := ioutil.ReadFile("d2.txt")
	if err != nil {
		panic(err)
	}

	str := string(data)
	ls := strings.Split(str, "\r\n")
	ts := ""
	var cs []Chapter
	id := 110

	c := make(chan string, 1)

	for _, l := range ls {
		//fmt.Println([]byte(l))

		if l == "" {
			ts += "\n"
			continue
		}

		if len(l) >= 4 && l[:4] == "    " {
			ts += "  " + l[4:] + "\n"
			continue
		}

		//这里从0开始的
		if id != 110 {
			c <- ts
			ts = ""
		}
		id++

		fmt.Println(strings.Replace(l[1:], "?", " ", -1))
		go func(id, uid int, title string) {
			s := <-c

			cs = append(cs, Chapter{
				Aid:     7,
				Zid:     id,
				Uid: uid,
				Title:   title,
				Author:  "吹牛者",
				Tags:    []string{"正文"},
				Content: s,
			})
		}(id, uid, strings.Replace(strings.SplitAfterN(l[1:], " ", 2)[1], "?", " ", -1))

		uid++
	}

	//fmt.Println(cs)

	for _, c := range cs {
		output(c)
	}
}

/*
两广攻略篇
*/
func d3() {
	uid := 2264

	data, err := ioutil.ReadFile("d3.txt")
	if err != nil {
		panic(err)
	}

	str := string(data)
	ls := strings.Split(str, "\r\n")
	ts := ""
	var cs []Chapter
	id := 0

	c := make(chan string, 1)

	for _, l := range ls {
		//fmt.Println([]byte(l))
		if l == "" {
			ts += "\n"
			continue
		}

		//忽略分割线
		if l == "------------" {
			continue
		}

		if len(l) >= 4 && l[:4] == "    " {
			ts += "  " + l[4:] + "\n"
			continue
		}

		//这里从1开始的
		if id != 0 {
			c <- ts
			ts = ""
		}
		id++

		go func(id, uid int, title string) {
			fmt.Println(title)
			s := <-c

			cs = append(cs, Chapter{
				Aid:     8,
				Zid:     id,
				Uid: uid,
				Title:   title,
				Author:  "吹牛者",
				Tags:    []string{"正文"},
				Content: s,
			})
		}(id, uid, strings.Replace(strings.SplitAfterN(l, " ", 2)[1], "?", " ", -1))

		uid++
	}

	//fmt.Println(cs)

	for _, c := range cs {
		output(c)
	}
}

func h1() {
	r1 := regexp.MustCompile(`\[(.{3}|.{2})\]\[y\d{3}\]`)
	r2 := regexp.MustCompile(`\[y\d{3}\]: \/characters\/y\d{3} "(.{3}|.{2})"\r\n`)

	dirs, err := ioutil.ReadDir("./output")
	if err != nil {
		panic(err)
	}

	for _, dir := range dirs {
		files, err := ioutil.ReadDir("./output/" + dir.Name())
		if err != nil {
			panic(err)
		}

		for _, file := range files {
			p := "./output/" + dir.Name() + "/" + file.Name()
			data, err := ioutil.ReadFile(p)
			if err != nil {
				panic(err)
			}

			err = ioutil.WriteFile(p, r2.ReplaceAll(r1.ReplaceAll(data, []byte("$1")), []byte("")), 0600)
			if err != nil {
				panic(err)
			}
		}
	}
}



func txt() {
	t, err := os.Create("临高启明-精校版-Halulu.txt")
	if err != nil {
		panic(err)
	}

	dirs, err := ioutil.ReadDir("./output")
	if err != nil {
		panic(err)
	}

	_, err = t.WriteString("临高启明精校版由Halulu整理，获取最新更新请访问官网 https://lgqm.halu.lu/ \n\n\n\n")
	if err != nil {
		panic(err)
	}

	for _, dir := range dirs {
		files, err := ioutil.ReadDir("./output/" + dir.Name())
		if err != nil {
			panic(err)
		}

		for _, file := range files {
			p := "./output/" + dir.Name() + "/" + file.Name()
			data, err := ioutil.ReadFile(p)
			if err != nil {
				panic(err)
			}

			ds := strings.SplitAfterN(string(data), "\n", 14)
			_, err = t.WriteString(ds[4][7:]+"\n"+ds[13])
			if err != nil {
				panic(err)
			}
		}
	}
}

func p1() {

}

func main() {
	//d0()

	//d1()
	//d2()
	//d3()

	//h1()

	//txt()

}
