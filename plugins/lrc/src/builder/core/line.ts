import type { Lyric } from '@music-lyric-kit/shared'
import type { Context } from '@root/builder/types'

import { exportTime } from '@music-lyric-kit/shared'

export const exportLines = (context: Context, info: Lyric.Info) => {
  const original = []
  const dynamic = []
  const translate = []
  const roman = []

  for (const line of info.lines) {
    const lineTime = `[${exportTime(line.time.start)}]`

    if (line.content.dynamic) {
      const content = line.content.dynamic
      const items = content.items.map((item) => {
        const time = exportTime(item.time.start)
        return `<${time}>${item.content.original}${item.config.space.end ? ' ' : ''}`
      })

      const dynamicLine = `${lineTime}${items.join('')}`
      dynamic.push(dynamicLine)

      const originalLine = `${lineTime}${content.items.map((item) => `${item.content.original}${item.config.space.end ? ' ' : ''}`).join('')}`
      original.push(originalLine)
    } else {
      const target = `${lineTime}${line.content.original}`
      original.push(target)
    }

    for (const item of line.content.extended || []) {
      const target = `${lineTime}${item.content}`
      switch (item.type) {
        case 'TRANSLATE':
          translate.push(target)
          break
        case 'ROMAN':
          roman.push(target)
          break
      }
    }
  }

  return {
    original,
    dynamic,
    translate,
    roman,
  }
}
