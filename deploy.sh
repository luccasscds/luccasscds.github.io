set -e

yarn build
# yarn version --patch

cd dist/

git init
git checkout -b main
git add -A
git commit -m '🚀 Deploy'
# git commit --amend -m '🚀 Deploy'
git push -f git@github.com:luccasscds/luccasscds.github.io.git production

cd -