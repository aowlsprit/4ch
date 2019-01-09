#!/usr/bin/env node

const { fromString: htmlToString } = require('html-to-text')

const { downloadThreadImages, getBoardCatalog, getThread } = require('.')

const log = arr => {
  console.log(arr.map((obj) => JSON.stringify(obj, null, 2)).join('\n'))
}

const printBoard = threads => {
  console.log(
    threads
      .map(({ no, semantic_url: semanticUrl, images, replies }) =>
        `${no}: ${semanticUrl} [${images}/${replies}]`)
      .join('\n')
  )
}

const printThread = posts => {
  console.log(
    posts
      .map(({ no, com }) =>
        `[${no}]\n  ${htmlToString(com).split('\n').join('\n  ')}`)
      .join('\n\n')
  )
}

const COMMANDS = {
  dl: {
    fn: downloadThreadImages,
    log
  },
  ls: {
    fn: getBoardCatalog,
    log: printBoard
  },
  cat: {
    fn: getThread,
    log: printThread
  }
}

const [,, command, ...args] = process.argv

if (COMMANDS[command] == null) {
  console.error('Please provide one of the known commands.')
  console.error('> 4ch ls  <board>')
  console.error('> 4ch cat <board> <thread>')
  console.error('> 4ch dl  <board> <thread>')
  process.exit(1)
}

const executeCommand = async (command, ...args) => {
  const { fn, log } = COMMANDS[command]
  const re = await fn(...args)
  log(re)
}

try {
  executeCommand(command, ...args)
} catch (err) {
  console.error(err.message)
}
