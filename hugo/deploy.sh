export TZ='Asia/Shanghai'
git config --global user.email circleci@halu.lu
git config --global user.name halulu-circleci
git config --global core.quotepath false

cd hugo

#download hugo
curl -L -o hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v0.67.1/hugo_0.67.1_Linux-64bit.tar.gz
tar -xzvf hugo.tar.gz

git clone git@github.com:lzjluzijie/lgqm.git -b gh-pages gh-pages

#build site
./hugo --minify
cp gh-pages/.git public -r

#deploy
cd public
git add .
git commit -m "Site updated by circleci: `date +"%Y%m%d-%H:%M:%S"` UTC+8"
git push origin gh-pages
