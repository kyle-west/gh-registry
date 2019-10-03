#!/usr/bin/env node

const { makePackagesFromTags } = require('./lib/packages-from-tags')


const [ action, ...args ] = process.argv.slice(2)

switch (action) {
  // ghpm sync-packages-from-tags
  case 'sync-packages-from-tags': {
    makePackagesFromTags((err) => {
      if (err) throw err
      console.log('Done')
    })
    break;
  }
  default : {
    console.log('I do not know what you want by', action)
  }
}
