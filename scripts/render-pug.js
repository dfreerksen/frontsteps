'use strict'

const $console = require('Console')
const fs = require('fs-extra')
const upath = require('upath')
const pug = require('pug')
const sh = require('shelljs')
const prettier = require('@prettier/sync')

module.exports = function renderPug (filePath) {
  const destPath = filePath.replace(/src\/pug\/\pages/, 'dist').replace(/\.pug$/, '.html')
  const srcPath = upath.resolve(upath.dirname(__filename), '../src')

  $console.log(`### INFO: Rendering ${filePath} to ${destPath}`)

  const html = pug.renderFile(filePath, {
    doctype: 'html',
    filename: filePath,
    basedir: srcPath
  })

  const destPathDirname = upath.dirname(destPath)

  if (!sh.test('-e', destPathDirname)) {
    sh.mkdir('-p', destPathDirname)
  }

  const prettified = prettier.format(html, {
    printWidth: 1000,
    tabWidth: 4,
    singleQuote: true,
    proseWrap: 'preserve',
    endOfLine: 'lf',
    parser: 'html',
    htmlWhitespaceSensitivity: 'ignore'
  })

  fs.writeFileSync(destPath, prettified)
}
