小说《临高启明》的网站
======================

本站托管于github page上，由jekyll实现，实现了小说《临高启明》的共享式编辑，即每个注册于Github的用户均可对各章节的内容进行修改，并可追踪各修改的具体内容及修改人。修改只有经同意后才能在被接受(术语称为：版本控制)。

# 准备程序

编辑章节、增加章节、增加卷均需在github注册，登录github后才能执行上述操作。浏览、下载无需注册。

# 编辑章节：

点击[网站](http://lingaoqiming.github.io/)进入各具体章节。在每一章节页面下点击“页面编辑”，即可进入github页面编辑，点右上方的小笔，进入编辑模式。所有文件均为[markdown格式](https://www.zybuluo.com/mdeditor?url=https://www.zybuluo.com/static/editor/md-help.markdown)，编辑时：
- **1、文件前几行（即"---"之间的几行）用于网站控制，请勿修改**。
- 2、各行的第一个字不能是+,-,空格(半角空格),*等，总之是中文（包括全角空格）就行了。每行是一段。
- 3、各行间要加一空白行，就是只有一个回车，回车前没有任何字符。
- 4、修改中可以点左上方的"Preview changes"查看本次修改的内容。

#### 提交修改

点击下方的"propose file change"按钮，进入提交修改页面，再按"create pull request"提交修改。这两个按钮上方会有二个文本框用于描述修改。第一个比较简短，会显示在"history"(历史)中，第二个可以很长，可以描述修改内容，以及为什么要这样修改。

修改提交后不会马上显示。首先要经网站（代码仓库）拥有者确认修改。确认修改后git page的jekyll引擎还要重新生成网页，生成网页程约需30分钟（github　说只要10分钟，实际每次都要20分钟以上）左右。
文件自建立以来的所有修改可以点上方的"history"查看。

# 增加章节：

在卷目录页最下方，点“新增一节”进入新文件编辑页面。最上方lingaoqiming.github.com / _posts / 后面输入文件名。
文件名格式yyyy-mm-dd-v-xxxxxx.md，其中y为年，m为月，d为天，不足两位可以为空，可以是2014-1-9。jekyll按这这个日期的顺序显示章节，所以以2009年8月31日（D日？）为始，每一节加一天。v为卷，x为章节数乘100。如：“第六卷　第二百六十七节　包衣”的文件为2014-1-9-6-26700.md。“第六卷第二百六十八节　改制”就应该是2014-1-10-6-26800.md。以此类推。

文件的头部是：

```markdown
---
layout: post
title: 第二百六十八节　改制
category: 6
path: 2014-1-10-6-26800.md
tag: [normal]
---
```

直接按内容填写，第一行不改，第二行填标题，网页将显示此标题，章节内容无须再包含此标题。第三行填卷数，第四行填文件名。最后一行"---"后加入空白行。章节的内容复制粘贴，提交修改即可。

# 增加卷：
与增加章节类似，只是文件名是indexv.md，v是卷数，第八卷就是index8.md。

```markdown
---
layout: default
title: 第六卷　战争
category: 6
---
<ul>
  <ul>
    {% assign page_list = site.categories['6'] | sort:"date" %}
    {% for post in page_list %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</ul>
<hr/>
  <ul class="pagination">
  <li ><a href="https://github.com/lingaoqiming/lingaoqiming.github.com/new/master/_posts">新增一节</a></li>
  </ul>
<hr>
```
上述内容复制后，修改title(注意":"后面的空格)，category(注意":"后面的空格)，site.categories['']中的相关内容。还要把上一卷中"新增一节"的代码

```markdown
<hr/>
  <ul class="pagination">
  <li ><a href="https://github.com/lingaoqiming/lingaoqiming.github.com/new/master/_posts">新增一节</a></li>
  </ul>
<hr>
```

删除。

# 下载：

点击下载，将下载所有文件，包括代码。小说章节在"_psot"文件夹下，可以用emeditor合并。合并可以采取以下步骤：

#### 删除mdy文件头：

搜索－文件中替换,使用转义序列，"---\nlayout: default\ntitle: "　替换为"\n",　"category: 0\n---" 替换为"\n"(注意":"后面的空格)。

#### 删除空白行：

搜索－文件中替换,使用转义序列，"\n\n"　替换为"\n"。

#### 合并文档：

工具－合并/分割－合并文档到一个文件，拖选所有文件，合并。
