import type { Full } from '../types'

import { META } from './meta'
import { LINE } from './line'
import { INTERLUDE, DUET, PURIFICATION } from './content'

export { META }
export { LINE }
export { INTERLUDE, DUET, PURIFICATION }

export const FULL: Full = {
  meta: META,
  content: {
    interlude: INTERLUDE,
    duet: DUET,
    purification: PURIFICATION,
  },
  line: {
    common: LINE,
  },
} as const
