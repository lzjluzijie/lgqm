package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"regexp"
	"strings"
	"text/template"
)

type Volume struct {
	Chapters []Chapter
}

type Chapter struct {
	Aid     int
	Zid     int
	Title   string
	Author  string
	Tags    []string
	Content string
}

const mc = `---
aid: {{ .Aid }}
zid: {{ .Zid }}
title: {{ printf "%04d.%04d-%s" .Aid .Zid .Title }}
author: {{ .Author }}
tags: {{ range $tag := .Tags }}
 - {{ $tag }}
{{ end }}
---


{{ .Content }}

`

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

/*
https://github.com/lzjluzijie/lingaoqiming.github.com
从开篇到第七章110
*/
func d2() {
	files, err := ioutil.ReadDir("./lingaoqiming.github.com/_posts")
	if err != nil {
		panic(err)
	}

	tc, err := template.New("chapter").Parse(mc)
	if err != nil {
		panic(err)
	}

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

		f, err := os.Create(fmt.Sprintf("./data/%04d/%04d.md", a, b))
		if err != nil {
			panic(err)
		}

		fmt.Printf("%v\n", ts[2])
		err = tc.Execute(f, Chapter{
			Aid:     a,
			Zid:     b,
			Title:   ts[2],
			Author:  "吹牛者",
			Tags:    []string{"正文"},
			Content: s[7],
		})

		if err != nil {
			panic(err)
		}
	}
}

/*
从第七章广州攻略篇111到结束
*/
func d3() {
	data, err := ioutil.ReadFile("txtren.txt")
	if err != nil {
		panic(err)
	}

	str := string(data)
	ls := strings.Split(str, "\r\n")
	ls = ls[200764:]
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

		//这里从0开始的
		if id != 0 {
			c <- ts
			ts = ""
		}
		id++

		fmt.Println(strings.Replace(l[1:], "?", " ", -1))
		go func(id int, title string) {
			s := <-c

			cs = append(cs, Chapter{
				Aid:     8,
				Zid:     id,
				Title:   title,
				Author:  "吹牛者",
				Tags:    []string{"正文"},
				Content: s,
			})
		}(id, strings.Replace(l[1:], "?", " ", -1))
	}

	//fmt.Println(cs)

	for _, c := range cs {
		f, err := os.Create(fmt.Sprintf("./data/0008/%04d.md", c.Zid))
		if err != nil {
			panic(err)
		}

		err = tc.Execute(f, c)
		if err != nil {
			panic(err)
		}
	}
}

/*
两广攻略篇
*/
func d4() {
	data, err := ioutil.ReadFile("365book.txt")
	if err != nil {
		panic(err)
	}

	str := string(data)
	ls := strings.Split(str, "\r\n")
	ls = ls[224358:]
	ts := ""
	var cs []Chapter
	id := 184

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

		//忽略分割线
		if l == "------------" {
			continue
		}

		if len(l) >= 4 && l[:4] == "    " {
			ts += l[4:] + "\n"
			continue
		}

		//这里从184开始的
		if id != 184 {
			c <- ts
			ts = ""
		}
		id++

		go func(id int, title string) {
			fmt.Println(title)
			s := <-c

			cs = append(cs, Chapter{
				Aid:     8,
				Zid:     id,
				Title:   title,
				Author:  "吹牛者",
				Tags:    []string{"正文"},
				Content: s,
			})
		}(id, strings.Replace(l, "?", " ", -1))
	}

	//fmt.Println(cs)

	for _, c := range cs {
		f, err := os.Create(fmt.Sprintf("./data/0008/%04d.md", c.Zid))
		if err != nil {
			panic(err)
		}

		err = tc.Execute(f, c)
		if err != nil {
			panic(err)
		}
	}
}

func h1() {
	re := regexp.MustCompile(`\[(.{3}|.{2})\]\[y\d{3}\]`)

	dirs, err := ioutil.ReadDir("./hugo/content")
	if err != nil {
		panic(err)
	}

	for _, dir := range dirs {
		files, err := ioutil.ReadDir("./hugo/content/" + dir.Name())
		if err != nil {
			panic(err)
		}

		for _, file := range files {
			p := "./hugo/content/" + dir.Name() + "/" + file.Name()
			data, err := ioutil.ReadFile(p)
			if err != nil {
				panic(err)
			}

			err = ioutil.WriteFile(p, re.ReplaceAll(data, []byte("$1")), 0600)
			if err != nil {
				panic(err)
			}
		}
	}
}

func txt() {
	t, err := os.Create("lgqm.txt")
	if err != nil {
		panic(err)
	}

	dirs, err := ioutil.ReadDir("./hugo/content")
	if err != nil {
		panic(err)
	}

	for _, dir := range dirs {
		files, err := ioutil.ReadDir("./hugo/content/" + dir.Name())
		if err != nil {
			panic(err)
		}

		for _, file := range files {
			p := "./hugo/content/" + dir.Name() + "/" + file.Name()
			data, err := ioutil.ReadFile(p)
			if err != nil {
				panic(err)
			}

			ds := strings.SplitAfterN(string(data), "\n", 13)
			_, err = t.WriteString(ds[3][7:]+"\n"+ds[12])
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
	//d4()

	//h1()

	txt()
}
