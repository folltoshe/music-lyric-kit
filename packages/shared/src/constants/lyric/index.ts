import type { LyricInfo } from '@root/types'

export * from './time'
export * from './line'

export const EMPTY_LYRIC_INFO: LyricInfo = {
  config: {
    isInstrumental: false,
    isSupportAutoScroll: false,
  },
  meta: {
    offset: {
      raw: '',
      parsed: 0,
    },
  },
  lines: [],
  groups: [],
} as const
