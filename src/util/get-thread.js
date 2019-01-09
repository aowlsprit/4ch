const fetch = require('node-fetch')

const API_URI = 'https://a.4cdn.org/'

const getThread = async (board, thread) => {
  if (board == null || thread == null) {
    throw new Error('Please provide both <board> and <thread>.')
  }
  return fetch(`${API_URI}/${board}/thread/${thread}.json`)
    .then(res => res.json())
    .then(async ({ posts }) => posts)
    .catch(err => console.log('Error fetching thread.', err))
}

module.exports = {
  getThread
}
