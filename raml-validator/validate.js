#!/usr/bin/env node

'use strict'

const path = require('path')
const yargs = require('yargs')
const fs = require('fs')
const childProcess = require('child_process')

const argv = yargs
    .usage('Usage:\n  validate.js </path/to/raml> [options]')

    .help('h')
    .alias('h', 'help')

    .example('validate definition.raml')
    .argv

let errors = false

if (argv._.length === 1) {
  validate(argv._[0])
} else {
  recursiveValidation('./')
}

if (errors) {
  console.log('Ooooops: there are errors at RAML files')
  process.exit(1)
}

function validate (file) {
  const fileName = path.resolve(process.cwd(), file)

  var executable = 'node /usr/local/lib/node_modules/raml-basic-validator/node_modules/@grapi/raml-typescript-validator/dist/index.js -r ' + fileName
  try {
    childProcess.execSync(executable)
  } catch (e) {
    errors = true
  }
}

function recursiveValidation (dir) {
  var files = fs.readdirSync(dir)
  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory() && file !== 'node_modules') {
      recursiveValidation(dir + '/' + file)
    } else {
      if (path.extname(file) === '.raml') {
        console.log('validate', dir + '/' + file)
        validate(dir + '/' + file)
      }
    }
  })
}
