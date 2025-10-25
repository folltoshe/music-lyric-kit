import type { LyricInfo } from '@root/types'

export * from './time'
export * from './line'

export const EMPTY_LYRIC_INFO: LyricInfo = {
  meta: {
    offset: {
      raw: '',
      parsed: 0,
    },
  },
  line: {
    total: 0,
    items: [],
  },
  group: {
    total: 0,
    items: [],
  },
  config: {
    isInstrumental: false,
    isSupportAutoScroll: false,
  },
} as const
