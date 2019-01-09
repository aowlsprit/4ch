const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const CDN_URI = 'https://i.4cdn.org/'

// Fetch image from CDN, write result to file.
const fetchToFile = (board, folderPath, filename, cb) => {
  const file$ = fs
    .createWriteStream(path.join(folderPath, filename))
    .on('finish', (err) => {
      if (cb != null) {
        cb(err)
      }
    })

  fetch(`${CDN_URI}/${board}/${filename}`)
    .then(res => res.body.pipe(file$))
    .catch(err => console.error('Error fetching image.', err))
}

module.exports = {
  fetchToFile
}
