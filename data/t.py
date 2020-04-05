from lxml import etree


def wiki2md(aid, author):
    f = open(aid + '.html', 'r', encoding='UTF-8')
    s = etree.HTML(f.read())

    s = s[0][0]

    t = '---\naid: ' + aid + '\nzid: %d\ntitle: %s\nauthor: ' + author + '\n---\n\n'

    zid = 1
    for n in s:
        if n.tag == "h2":
            f = open("output/" + aid + "/%04d.md" % zid, "w", encoding='UTF-8')
            f.write(t % (zid, n[0].text))
            zid = zid + 1
        else:
            if n.text is not None:
                f.write(n.text)
                f.write("\n")


#wiki2md("2004", "社会主义螺丝刀")
#wiki2md("2005", "QDD")
#wiki2md("2006", "QDD")
# wiki2md("2007", "QDD")
# wiki2md("2011", "项天鹰")
# wiki2md("2015", "项天鹰")
# wiki2md("1006", "恶魔后花园")
# wiki2md("1007", "恶魔后花园")
wiki2md("1010", "聂义峰")
