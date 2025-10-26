import type { DeepRequired } from '@root/utils'
import type { CommonInterludeOptions, CommonDuetOptions, CommonPurificationOptions, CommonLineOptions } from '../types'

import { INSERT_TEXT_SPACE_TYPES, MATCH_MODE } from '@root/utils'

export const COMMON_INTERLUDE_OPTIONS: DeepRequired<CommonInterludeOptions> = {
  enable: true,
  checkTime: 10000,
  firstLineCheckTime: 5000,
} as const

export const COMMON_DUET_OPTIONS: DeepRequired<CommonDuetOptions> = {
  enable: true,
  replace: true,
} as const

export const COMMON_PURIFICATION_OPTIONS: DeepRequired<CommonPurificationOptions> = {
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

export const COMMON_LINE_OPTIONS: DeepRequired<CommonLineOptions> = {
  replace: {
    enable: true,
    punctuation: true,
  },
  insert: {
    space: {
      enable: true,
      types: [INSERT_TEXT_SPACE_TYPES.ALL],
    },
  },
  prolongedSound: {
    enable: true,
    checkTime: 1000,
  },
} as const
