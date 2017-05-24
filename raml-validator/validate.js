#!/usr/bin/env node

'use strict'

const raml = require('raml-1-parser')
const path = require('path')
const yargs = require('yargs')
const fs = require('fs')

const argv = yargs
    .usage('Usage:\n  validate.js </path/to/raml> [options]')

    .help('h')
    .alias('h', 'help')

    .example('validate definition.raml')
    .argv

  // TODO: Temporal solution for submodules
const exec = require('child_process').exec

exec('git submodule update --init --recursive', function (error) {
  if (error !== null) {
    console.log('exec error: ' + error)
  } else {
    console.log('Updated git submodules')
  }

  if (argv._.length === 1) {
    validate(argv._[0])
  } else {
    recursiveValidation('./')
  }

  console.log('RAML parsing success.')
})

function validate (file) {
  const fileName = path.resolve(process.cwd(), file)

  try {
    raml.loadApiSync(fileName, {rejectOnErrors: true})
  } catch (err) {
    err.parserErrors.forEach((parserError) => {
      console.log('Parsing error: ' + parserError.message)
    })
    throw err.message
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
