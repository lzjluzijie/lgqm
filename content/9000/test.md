---
aid: "9000"
zid: "test"
title: 测试
author: Halulu
---

> 测试 markdown 解析程序[^代码]
>
> - ![remark](https://github.com/remarkjs/remark)
> - ![rehype](https://github.com/rehypejs/rehype)
> - ![gray-matter](https://github.com/jonschlinkert/gray-matter) 

# H1

## H2

### H3

#### H4

##### H5

###### H6

![icon](/icon.png)

1. 第一卷「启航」

2. 第二卷「新世界」

3. 第三卷「新社会」

4. 第四卷「新澳洲」

5. 第五卷「进入」

6. 第六卷「纷争」

7. - 第七卷「大陆」广州治理篇

   - 第七卷「大陆」两广攻略篇[^注1]

[^注1]: 这里是一个注释

[^代码]:

    ```js
    const remark = unified()
      .use(markdown)
      .use(footnotes)
      .use(remark2rehype)
      .use(html).processSync
    ```
