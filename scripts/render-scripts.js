'use strict'

const $console = require('Console')
const fs = require('fs-extra')
const packageJSON = require('../package.json')
const upath = require('upath')
const sh = require('shelljs')
const uglify = require('uglify-js')

module.exports = function renderScripts () {
  const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js')
  const destPath = upath.resolve(upath.dirname(__filename), '../dist/js')
  const sourceExt = '.js'
  const destExt = '.js'

  const copyright = `/*!
 * ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
 * Copyright ${new Date().getFullYear()} ${packageJSON.author}
 * Licensed under ${packageJSON.license} (https://github.com/dfreerksen/${packageJSON.name}/blob/master/LICENSE)
 */
`

  if (!sh.test('-e', destPath)) {
    sh.mkdir('-p', destPath)
  }

  const compileScript = (file, min = false) => {
    const sourceName = upath.parse(file).name
    const destName = min ? `${sourceName}.min` : sourceName
    const sourceFilePath = `${sourcePath}/${sourceName}${sourceExt}`
    const destFilePath = `${destPath}/${destName}${destExt}`

    const scriptsJS = '' + fs.readFileSync(sourceFilePath)
    const scriptsContent = min ? uglify.minify(scriptsJS).code : scriptsJS

    fs.writeFileSync(destFilePath, copyright + scriptsContent)
  }

  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      $console.error(err)
    } else {
      files.forEach((file) => {
        if (upath.extname(file) === sourceExt) {
          compileScript(file, true)
          compileScript(file, false)
        }
      })
    }
  })
}
