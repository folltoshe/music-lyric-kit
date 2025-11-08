import type { Info } from '../types'

import { EMPTY_TIME } from './time'
import { LINE_TYPES, EMPTY_WORD_ITEM, EMPTY_LINE_INFO } from './line'

export { EMPTY_TIME }
export { LINE_TYPES, EMPTY_WORD_ITEM, EMPTY_LINE_INFO }

export const EMPTY_INFO: Info = {
  config: {
    isInstrumental: false,
    isSupportAutoScroll: false,
    isDynamic: false,
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
