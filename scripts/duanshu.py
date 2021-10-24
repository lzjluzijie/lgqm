import requests
from markdownify import markdownify as md

cookies = {'auid': '填入信息'}
headers = {'x-member': '填入信息', 'x-platform': 'h5'}


# 佛山实习卷
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=f9a15f2448444fd09bbde1bf8f4cad82&shop_id=ed4868243jdg2g6275'
# id = 0
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=7930c56d116b42fd91cbef02ea775288&order=desc&shop_id=ed4868243jdg2g6275'
# id = 20
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=229abd0b41764166b0c03c845eeb352f&order=desc&shop_id=ed4868243jdg2g6275'
# id = 30
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=4e40e3c30dcf4bc7bae2cd3c35a92b22&order=desc&shop_id=ed4868243jdg2g6275'
# id = 50
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=b822117de54d4a98a53445a21e19a649&order=desc&shop_id=ed4868243jdg2g6275'
# id = 70

# 粤北平定卷
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=0b1c4cf6e7f24e8da11e37882de73704&order=desc&shop_id=ed4868243jdg2g6275'
# id = 183
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=730b83bc3c704a4ba2c4ceecdd31b380&order=desc&shop_id=ed4868243jdg2g6275'
# id = 203
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=b3ccb51fac27447b8332487681a6aee6&order=desc&shop_id=ed4868243jdg2g6275'
# id = 224
# apiURL = 'https://api.duanshu.com/h5/content/column/contents?page=1&count=50&column_id=7ade8c0482ed4f42b21f70eef61426bb&order=desc&shop_id=ed4868243jdg2g6275'
# id = 244


r = requests.get(apiURL, cookies=cookies)

for page in r.json()['response']['data']:
    id += 1
    zid = '%04d' % id
    title: str = page['title']
    title = title.split('　')[-1]
    contentID = page['content_id']
    r = requests.get(
        f'https://api.duanshu.com/h5/content/detail/{contentID}?shop_id=ed4868243jdg2g6275', headers=headers)
    content = r.json()['response']['data']['content']
    out = f'''---
aid: "0101"
zid: "{zid}"
title: {title}
author: 吹牛者
---

{md(content)}
'''
    f = open(f'{zid}.md', "w")
    f.write(out)
    f.close()
