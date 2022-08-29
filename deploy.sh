set -e

yarn build
yarn version --patch

# Git
git push origin --tags

cd dist/
# Git
git init
git checkout -b production
git add -A
git commit -m '🚀 Deploy'
# git commit --amend -m '🚀 Deploy'
git push -f git@github.com:luccasscds/luccasscds.github.io.git production

cd -