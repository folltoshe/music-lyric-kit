import type { FullRequired } from '../types'

import { META } from './meta'
import { LINE } from './line'
import { INTERLUDE, DUET, PURIFICATION } from './content'

export { META }
export { LINE }
export { INTERLUDE, DUET, PURIFICATION }

export const FULL: FullRequired = {
  meta: META,
  content: {
    interlude: INTERLUDE,
    duet: DUET,
    purification: PURIFICATION,
  },
  line: {
    normal: {
      original: LINE,
      dynamic: LINE,
    },
    extended: {
      translate: LINE,
      roman: LINE,
      unknown: LINE,
    },
  },
} as const
