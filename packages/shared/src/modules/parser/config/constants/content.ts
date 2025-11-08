import type { Interlude, Duet, Purification } from '../types'

import { MATCH_MODE } from '@root/utils'

export const INTERLUDE: Interlude = {
  enable: true,
  checkTime: 10000,
  firstLineCheckTime: 5000,
} as const

export const DUET: Duet = {
  enable: true,
  replace: true,
} as const

export const PURIFICATION: Purification = {
  enable: true,
  match: {
    mode: MATCH_MODE.FUZZY,
    exact: {
      checkPercentage: 50,
    },
    fuzzy: {},
    rule: {
      useDefault: true,
      custom: [],
    },
  },
  firstLine: {
    useMusicInfo: true,
    mode: MATCH_MODE.EXACT,
    exact: {
      checkPercentage: 30,
    },
    fuzzy: {},
    rule: {
      useDefault: true,
      custom: [],
    },
  },
}
