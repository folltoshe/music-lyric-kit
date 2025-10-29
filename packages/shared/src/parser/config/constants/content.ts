import type { DeepRequired } from '@root/common'
import type { Interlude, Duet, Purification } from '../types'

import { MATCH_MODE } from '@root/common'

export const INTERLUDE: DeepRequired<Interlude> = {
  enable: true,
  checkTime: 10000,
  firstLineCheckTime: 5000,
} as const

export const DUET: DeepRequired<Duet> = {
  enable: true,
  replace: true,
} as const

export const PURIFICATION: DeepRequired<Purification> = {
  enable: true,
  match: {
    mode: MATCH_MODE.FUZZY,
    exact: {
      check: {
        percentage: 50,
      },
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
      check: {
        percentage: 30,
      },
    },
    fuzzy: {},
    rule: {
      useDefault: true,
      custom: [],
    },
  },
}
