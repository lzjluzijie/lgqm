import os

# 暂时这样
naid = {
    "1": "0001",
    "2": "0002",
    "3": "0003",
    "4": "0004",
    "5": "0005",
    "6": "0006",
    "7": "0007",
    "8": "0008",
    "2001": "1001",
    "2002": "1002",
    "2003": "1003",
    "2004": "1004",
    "2005": "1021",
    "2006": "1022",
    "2007": "1023",
    "2008": "1024",
    "2009": "1005",
    "2010": "1006",
    "2011": "1011",
    "2012": "1012",
    "2013": "1013",
    "2014": "1014",
    "2015": "1015",
    "2016": "1016",
    "2017": "1017",
    "2018": "1018",
    "2019": "1019",
}

for root, dirs, files in os.walk("../hugo/content"):
    for dir in dirs:
        print(dir)
    for name in files:
        if name == "_index.md" or name == "archive.md":
            print(os.path.join(root, name))
        else: 
            t = ""
            aid = "aid"
            title = "title"
            f = open(os.path.join(root, name), encoding='UTF-8')
            
            for line in f.read().split('\n', 15):
                if line[0:5] == "aid: ":
                    aid = naid.get(line[5:])
                    t+= "aid: "+aid+"\n"
                elif line[0:5] == "uid: ":
                    print(line[5:])
                elif line[0:7] == "title: ":
                    title = line[17:]
                    t+= "title: "+title+"\n"
                    print(title)
                elif line == "tags: " or line[0:3] == " - ":
                    continue
                else:
                    t+= line+"\n"

            nf = open(os.path.join('./output/20200404', aid, name), "w", encoding='UTF-8')
            nf.write(t)

