set -e

yarn build

cd dist/

git init
git checkout -b main
git add -A
git commit -m '🚀 deploy'
git push -f git@github.com:luccasscds/luccasscds.github.io.git production

cd -