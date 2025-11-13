<div align="center">
  <img src="https://socialify.git.ci/folltoshe/music-lyric-kit/image?custom_description=Music+Lyric+Parser+And+Builder&description=1&font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto" />
</div>

<div align="center">
  Music Lyric Parser And Builder
</div>

## Features

- Format Support

  - [x] LRC
  - [ ] KRC
  - [ ] QRC
  - [ ] YRC
  - [x] TTML

- Export Lyric

  - [x] LRC
  - [ ] KRC
  - [ ] QRC
  - [ ] YRC
  - [ ] TTML

- Parse Main Lyric

  - [x] Original
  - [x] Dynamic

- Parse Extended Lyric

  - [x] Translate
  - [x] Roman
  - [ ] Unknown

- Parse Meta

  - [x] Meta Tag
  - [x] Match Producer

- Extra

  - [x] Insert Space
  - [x] Insert Interlude Line
  - [x] Insert Duet Info
  - [x] Purification Lyrics

## Install

```shell
npm music-lyric-kit
```

## Usage

```js
import { LyricParser } from 'music-lyric-kit'

const parser = new LyricParser()

const origin = ''
const dynamic = ''
const translate = ''
const roman = ''

const result = parser.lrc.parse({ content: { original, dynamic, translate, roman } })

console.log(result)
```

## Contributor

[![Contributor](https://contrib.rocks/image?repo=folltoshe/music-lyric-kit)](https://github.com/folltoshe/music-lyric-kit/graphs/contributors)

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2025 - now, Folltoshe
