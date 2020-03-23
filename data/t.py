from lxml import etree

f = open('2002.html', 'r', encoding='UTF-8')
s = etree.HTML(f.read())

s = s[0][0]

# print(etree.tostring(s[0][0], pretty_print=True))
# print(s[0][0].text)


# def inner(element):
#     if element.text != "":
#         return element.text
#     else:
#         inner(element[0])

t = '---\naid: 2002\nzid: %d\ntitle: 2002.%04d-%s\nauthor: 社会主义螺丝刀\n---\n\n'

zid = 1
for n in s:
    if n.tag == "h2":
        f = open("output/2002/%04d.md" % zid, "w", encoding='UTF-8')
        f.write(t % (zid, zid, n[0].text))
        zid = zid + 1
    else:
        if n.text is not None:
            f.write(n.text)
            f.write("\n")
