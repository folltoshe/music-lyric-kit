<div align="center">
  Music Lyric Parser And Builder
</div>

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
