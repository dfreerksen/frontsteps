'use strict'

const $console = require('Console')
const concurrently = require('concurrently')
const upath = require('upath')

const browserSyncPath = upath.resolve(upath.dirname(__filename), '../node_modules/.bin/browser-sync')

const { result } = concurrently([
  { command: 'node --inspect scripts/sb-watch.js', name: 'SB_WATCH', prefixColor: 'bgBlue.bold' },
  {
    command: `${browserSyncPath} dist -w --no-online`,
    name: 'SB_BROWSER_SYNC',
    prefixColor: 'bgBlue.bold'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success']
})
result.then(success, failure)

function success () {
  $console.success('Success')
}

function failure () {
  $console.error('Failure')
}
