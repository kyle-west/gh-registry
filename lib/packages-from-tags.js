const fs = require('fs')
const path = require('path')
const semver = require('semver')
const git = require('simple-git')(process.cwd());
const { iterationScheduler } = require('./helpers')

function makePackagesFromTags(done = (() => {})) {
  const published = []

  git.tag([], (err, stdout) => {
    let tags = [...new Set(stdout.split('\n').filter(x => semver.valid(x)).map(x => semver.clean(x)))]
  
    const schedule = iterationScheduler(tags);
  
    function recuseOverSchedule(schedule, finalCallback) {
      const { done, value: tag } = schedule.next();
      if (done) return finalCallback(null);
  
      git.checkout(`tags/${tag}`, (err) => {
        if (err) finalCallback(err);
        fs.readFile(path.resolve(process.cwd(), './package.json'), (err, data) => {
          if (err) finalCallback(err);
  
          const pack = JSON.parse(data)

          published.push(pack.version)
  
          console.log('Package Version is', pack.version, 'in tag', tag);
  
          recuseOverSchedule(schedule, finalCallback)
        })
      });
    }
  
    // begin recursion
    recuseOverSchedule(schedule, (err => {
      if (err) console.err(err)
      git.checkout('master', err => done(err))
    }))
  })  
}

module.exports = {
  makePackagesFromTags
}