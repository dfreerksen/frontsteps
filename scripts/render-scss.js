'use strict'

const $console = require('Console')
const autoprefixer = require('autoprefixer')
const fs = require('fs-extra')
const packageJSON = require('../package.json')
const upath = require('upath')
const postcss = require('postcss')
const minify = require('postcss-minify')
const sass = require('sass')
const sh = require('shelljs')

module.exports = function renderSCSS () {
  const sourcePath = upath.resolve(upath.dirname(__filename), '../src/scss')
  const destPath = upath.resolve(upath.dirname(__filename), '../dist/css')
  const sourceExt = '.scss'
  const destExt = '.css'

  const copyright = `/*
 * ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
 * Copyright ${new Date().getFullYear()} ${packageJSON.author}
 * Licensed under ${packageJSON.license} (${packageJSON.homepage}/blob/master/LICENSE)
 */
`

  const results = (stylePath) => {
    return sass.renderSync({
      data: '' + fs.readFileSync(stylePath),
      includePaths: [
        upath.resolve(upath.dirname(__filename), '../node_modules'),
        sourcePath
      ]
    })
  }

  if (!sh.test('-e', destPath)) {
    sh.mkdir('-p', destPath)
  }

  const compileStyle = (file, min = false) => {
    const sourceName = upath.parse(file).name
    const destName = min ? `${sourceName}.min` : sourceName
    const sourceFilePath = `${sourcePath}/${sourceName}${sourceExt}`
    const destFilePath = `${destPath}/${destName}${destExt}`
    const postcssPlugins = min ? [autoprefixer, minify] : [autoprefixer]

    postcss(postcssPlugins).process(results(sourceFilePath).css, {
      from: `${sourceName}${sourceExt}`,
      to: `${destName}${destExt}`
    }).then((result) => {
      result.warnings().forEach((warn) => {
        $console.warn(warn.toString())
      })
      fs.writeFileSync(destFilePath, copyright + result.css.toString())
    })
  }

  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      $console.error(err)
    } else {
      files.forEach((file) => {
        if (upath.extname(file) === sourceExt) {
          compileStyle(file, true)
          compileStyle(file, false)
        }
      })
    }
  })
}
