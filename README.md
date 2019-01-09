# 4ch
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Minimal Node.js API and CLI for getting what you want out of 4chan.

## Installation
```bash
yarn global add 4ch
```
Or if you prefer npm
```
npm install -g 4ch
```

## Commands (CLI)

```
4ch [ls|dl|cat] [options]

DESCRIPTION
  ls -- List all active threads of a given board.
    options: [board]
    example: 4ch list g
  dl -- Download all image/gif/web files of a given thread in a board. Images are downloaded to the `process.cwd()/4ch-out/` folder.
    options: [board, thread]
    example: 4ch dl g 123456789
  cat -- Print all posts of a given thread in a board.
    options: [board, thread]
    example: 4ch cat g 123456789
```

## Usage (API)
```js
const { getImages, printCatalog } = require('4ch')

printCatalog('g')
getImages('g', '123456789')
```


## Contact
@aowlsprit

