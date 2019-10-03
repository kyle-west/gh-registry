#!/usr/bin/env node

const git = require('simple-git')(process.cwd());
const path = require('path')
git.tag([], (err, stdout) => {
  let tags = [...new Set(stdout.split('\n').filter(x => !!x).map(x => x.startsWith('v') ? x.substring(1) : x))]
  tags.forEach(tag => git.checkout(tag, (err, data) => {
    let pack = require(path.resolve(process.cwd(), './package.json'))
    console.log(data);
    console.log(pack);
  }))
})