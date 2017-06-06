#!/usr/bin/env node

'use strict'

const path = require('path')
const yargs = require('yargs')
const fs = require('fs')
const childProcess = require('child_process')
const slack = require('simple-slack-webhook')

slack.init({
  path: 'https://hooks.slack.com/services/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',
  username: 'GLAPI bot',
  channel: '#test'
})

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
  var attachments = [{
    'fallback': 'New validation on a GLAPI repository fails',
    'title': 'GLAPI repository validation',
    'title_link': 'https://globaldevtools.bbva.com/jenkins/blue/pipelines',
    'text': 'Help! I tried to desings an API but something went wrong!',
    'color': '#f70202'
  }]
  slack.attachments(attachments)
  process.exit(1)
} else {
  slack.text('New validation on a GLAPI repository done')
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
