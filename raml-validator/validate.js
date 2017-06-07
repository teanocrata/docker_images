#!/usr/bin/env node

'use strict'

const path = require('path')
const yargs = require('yargs')
const fs = require('fs')
const childProcess = require('child_process')
const Slack = require('slack-node')

let slack = new Slack()
slack.setWebhook('https://hooks.slack.com/services/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')

const argv = yargs
    .usage('Usage:\n  validate.js </path/to/raml> [options]')

    .help('h')
    .alias('h', 'help')

    .example('validate definition.raml')
    .argv

const errors = []

if (argv._.length === 1) {
  validate(argv._[0])
} else {
  recursiveValidation('./')
}

slack.webhook({
  channel: '#development',
  username: 'raml-typescript-validator-bot',
  icon_emoji: errors.length > 0 ? ':poop:' : ':ghost:',
  text: 'New validation on a GLAPI repository: ' + getSlackMessage(errors)
}, function (err, response) {
  if (err) {
    console.log(err)
  }
  if (errors.length > 0) {
    console.log('Ooooops: there are errors at RAML files')
    process.exit(1)
  }
})

function validate (file) {
  const fileName = path.resolve(process.cwd(), file)

  var executable = 'node /usr/local/lib/node_modules/raml-basic-validator/node_modules/@grapi/raml-typescript-validator/dist/index.js -r ' + fileName
  try {
    childProcess.execSync(executable)
  } catch (e) {
    errors.push(e)
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

function getSlackMessage (errors) {
  const message = errors.reduce((comp, error) => comp + error.message, '')
  return message === '' ? 'OK' : message
}
