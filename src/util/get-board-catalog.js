const API_URI = 'https://a.4cdn.org/'
const fetch = require('node-fetch')

const getBoardCatalog = async (board) => {
  if (board == null) {
    throw new Error('Please provide <board>.')
  }
  return fetch(`${API_URI}${board}/catalog.json`)
    .then(re => re.json())
    .then((data) =>
      data.reduce((result, { page, threads }) => result.concat(threads), []))
    .catch(err => console.log('Error fetching Catalog.', err))
}

module.exports = {
  getBoardCatalog
}
