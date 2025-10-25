import type { LyricInfo } from '@root/types'
import type { ContextCommon } from '@root/types'

import { EMPTY_LINE_ITEM, LINE_TYPES } from '@root/constants'

import { cloneDeep } from '@root/utils'

export const insertInterlude = (context: ContextCommon, info: LyricInfo) => {
  const options = context.options.common.getByKey('content.interlude')
  if (!options.enable) {
    return info
  }

  const result = info
  const length = info.lines.length
  for (let index = 0; index < length; index++) {
    const current = info.lines[index]
    const next = info.lines[index + 1]

    // add interlude when first line is time too long
    if (index === 0 && current.time.start > options.firstLineCheckTime) {
      const line = cloneDeep(EMPTY_LINE_ITEM)
      const start = 500
      const duration = current.time.start - start
      const end = start + duration
      line.time = { start, end, duration }
      line.type = LINE_TYPES.INTERLUDE
      result.lines.push(line)
      continue
    }

    // add interlude
    if (next && next.time.start - current.time.end > options.checkTime) {
      const line = cloneDeep(EMPTY_LINE_ITEM)
      const start = current.time.end + 100
      const duration = Math.max(next.time.start - start, 0)
      const end = current.time.end + duration
      line.time = { start, end, duration }
      line.type = LINE_TYPES.INTERLUDE
      result.lines.push(line)
    }
  }

  return result
}
