import type { Full } from './types'

import { INSERT_TEXT_SPACE_TYPES, MATCH_MODE } from '@root/utils'

export const FULL: Full = {
  meta: {},
  content: {
    purification: {
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
    },
    interlude: { enable: true, checkTime: 10000, firstLineCheckTime: 5000 },
    duet: { enable: true, replace: true },
  },
  line: {
    main: {
      replace: {
        punctuation: true,
      },
      insert: {
        enable: true,
        space: {
          enable: true,
          types: [INSERT_TEXT_SPACE_TYPES.ALL],
        },
        prolonged: {
          enable: true,
          checkTime: 1000,
        },
      },
    },
    extended: {
      replace: {
        punctuation: true,
      },
      insert: {
        enable: true,
        space: {
          enable: true,
          types: [INSERT_TEXT_SPACE_TYPES.ALL],
        },
      },
    },
  },
} as const
