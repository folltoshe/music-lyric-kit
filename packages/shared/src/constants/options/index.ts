import type { CommonOptionsRequired } from '@root/types'

import { COMMON_META_OPTIONS } from './meta'
import { COMMON_INTERLUDE_OPTIONS, COMMON_DUET_OPTIONS, COMMON_PURIFICATION_OPTIONS, COMMON_LINE_OPTIONS } from './line'

export { COMMON_META_OPTIONS }

export { COMMON_INTERLUDE_OPTIONS, COMMON_DUET_OPTIONS, COMMON_LINE_OPTIONS }

export const COMMON_OPTIONS: CommonOptionsRequired = {
  meta: COMMON_META_OPTIONS,
  content: {
    interlude: COMMON_INTERLUDE_OPTIONS,
    duet: COMMON_DUET_OPTIONS,
    purification: COMMON_PURIFICATION_OPTIONS,
    normal: {
      original: COMMON_LINE_OPTIONS,
      dynamic: COMMON_LINE_OPTIONS,
    },
    extended: {
      translate: COMMON_LINE_OPTIONS,
      roman: COMMON_LINE_OPTIONS,
      unknown: COMMON_LINE_OPTIONS,
    },
  },
} as const
