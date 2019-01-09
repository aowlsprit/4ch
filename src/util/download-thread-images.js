const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { fetchToFile } = require('./fetch-to-file')

const API_URI = 'https://a.4cdn.org/'

const downloadThreadImages = async (board, thread) => {
  if (board == null || thread == null) {
    throw new Error('Please provide both <board> and <thread>.')
  }
  return fetch(`${API_URI}/${board}/thread/${thread}.json`)
    .then(res => res.json())
    .then(async ({ posts }) => {
      const { semantic_url: semanticUrl } = posts[0]
      const folderPath = path.join(process.cwd(), '4ch-out', `${board}-${thread}-${semanticUrl}`)
      fs.mkdirSync(folderPath, { recursive: true })

      return posts
        .filter(({ tim }) => tim != null)
        .map(({ tim, ext }) => {
          const filename = `${tim}${ext}`
          fetchToFile(board, folderPath, filename)
          return `>> ${folderPath}/${filename}`
        })
    })
    .catch(err => console.log('Error fetching thread.', err))
}

module.exports = {
  downloadThreadImages
}
