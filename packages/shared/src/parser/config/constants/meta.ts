import type { DeepRequired } from '@root/common'
import type { Meta } from '../types'

import { MATCH_MODE } from '@root/common'

export const META: DeepRequired<Meta> = {
  tag: {
    enable: true,
    name: {
      split: {
        rule: '/',
      },
    },
  },
  producer: {
    enable: true,
    replace: true,
    match: {
      mode: MATCH_MODE.FUZZY,
      exact: {
        check: {
          percentage: 60,
        },
      },
      fuzzy: {},
      rule: {
        useDefault: true,
        custom: [],
      },
    },
    role: {
      replace: {
        enable: true,
        rule: ['by'],
      },
    },
    name: {
      split: {
        rule: /(?:[/]|[,，])/iu,
      },
    },
  },
} as const
