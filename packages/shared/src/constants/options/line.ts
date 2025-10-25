import type { DeepRequired, CommonInterludeOptions, CommonDuetOptions, CommonLineOptions } from '@root/types'

import { INSERT_TEXT_SPACE_TYPES } from '@root/utils'

import { freezeDeep } from '@root/utils'

export const COMMON_INTERLUDE_OPTIONS: DeepRequired<CommonInterludeOptions> = {
  enable: true,
  checkTime: 10000,
  firstLineCheckTime: 5000,
} as const
freezeDeep(COMMON_INTERLUDE_OPTIONS)

export const COMMON_DUET_OPTIONS: DeepRequired<CommonDuetOptions> = {
  enable: true,
  replace: true,
} as const
freezeDeep(COMMON_DUET_OPTIONS)

export const COMMON_LINE_OPTIONS: DeepRequired<CommonLineOptions> = {
  purification: {
    enable: true,
    match: {
      mode: 'FUZZY',
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
      mode: 'EXACT',
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
  },
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
freezeDeep(COMMON_LINE_OPTIONS)
