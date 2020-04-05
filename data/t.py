from lxml import etree
import urllib.request
import urllib.parse
import os
import re



def download(url, path):
    try:
        urllib.request.urlretrieve(url, path)
    except:
        print("error! retry...")
        download(url, path)


def wiki2md(aid, author):
    f = open(aid + '.html', 'r', encoding='UTF-8')
    s = etree.HTML(f.read())

    s = s[0][0]

    t = '---\naid: ' + aid + '\nzid: %d\ntitle: %s\nauthor: ' + author + '\n---\n\n'

    zid = 1
    for n in s:
        if n.tag == "h2":
            f = open(os.path.join("./output/", aid, "%04d.md" % zid), "w", encoding='UTF-8')
            f.write(t % (zid, n[0].text))
            zid = zid + 1
        else:
            def helper(e):
                if e.tag == "img":
                    url = e.get("src")
                    match = re.match(r'https:\/\/huiji-thumb\.huijistatic\.com\/lgqm\/uploads\/thumb\/([a-z0-9])\/([a-z0-9]{2})\/([-a-zA-Z0-9%_\.]*)\/[-a-zA-Z0-9%_\.]*', url)
                    if match:
                        url = f"https://huiji-public.huijistatic.com/lgqm/uploads/{match.group(1)}/{match.group(2)}/{match.group(3)}"
                        name = urllib.parse.unquote(match.group(3))
                    else:
                        name = urllib.parse.unquote(url[url.rfind("/")+1:])
                    print(url)
                    print(name)
                    # download(url, os.path.join("./output", aid, name))
                    f.write(f"![{name}](/{aid}/{name})\n\n")
                else:
                    for c in e.iterchildren():
                        # 无视图片注释
                        if c.get("class") == "thumbcaption":
                            None
                        else:
                            helper(c)
                    if e.text is not None:
                        f.write(e.text)
                        # 奇怪的问题，稍微处理一下
                        if e.tail is not None: f.write(e.tail)
                        f.write("\n")
                return
            helper(n)
            


#wiki2md("2004", "社会主义螺丝刀")
#wiki2md("2005", "QDD")
#wiki2md("2006", "QDD")
# wiki2md("2007", "QDD")
# wiki2md("2011", "项天鹰")
# wiki2md("2015", "项天鹰")
# wiki2md("1006", "恶魔后花园")
# wiki2md("1007", "恶魔后花园")
# wiki2md("1010", "聂义峰")
wiki2md("1008", "恶魔后花园")
