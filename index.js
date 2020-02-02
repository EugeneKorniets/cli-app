#!/usr/bin/env node

const fs = require('fs')
const { concat } = require('mississippi')
const yargs = require('yargs')

const argv = yargs
  .usage('parse-json [options]')
  .help('h')
  .alias('h', 'help')
  .demand('f')
  .nargs('f', 1)
  .describe('f', 'JSON file  to parse')
  .argv

const { f: file } = argv

console.info({
  file
})

function parse (str) {
  const value = JSON.parse(str)
  console.info(JSON.stringify(value))
}

if (file === '-') {
  process.stdin.pipe(concat(parse))
} else {
  fs.readFile(file, (err, dataBuffer) => {
    if (err) {
      throw err
    } else {
      parse(dataBuffer.toString())
    }
  })
}
