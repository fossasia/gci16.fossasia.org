#!/bin/bash
# Push Coala fixes back to the repo
git config --global user.email "travis@travis-ci.org"
git config --global user.name "coala-autofix-bot"
git checkout -B coala-fix
git add .
git commit --message "Coala auto-patch for Travis CI Build:$TRAVIS_BUILD_NUMBER | Generated by Travis CI"
git remote add origin-pages https://coala-autofix-bot:$COALA_FIXER@github.com/fossasia/gci16.fossasia.org.git
git fetch --all
git pull --rebase origin-pages coala-fix
git push --quiet --set-upstream origin-pages coala-fix
curl -X POST -H "Authorization: token $GITHUB_TOKEN" --data '{"title":"coala-fixes for build '$TRAVIS_BUILD_NUMBER'", "body":"Automated Coala fixes:'$TRAVIS_BUILD_NUMBER'", "head":"coala-fix", "base":"gh-pages"}' https://api.github.com/repos/fossasia/gci16.fossasia.org/pulls
