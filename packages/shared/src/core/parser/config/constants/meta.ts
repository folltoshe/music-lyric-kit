import type { Meta } from '../types'

import { MATCH_MODE } from '@root/utils'

export const META: Meta = {
  tag: {
    enable: true,
    name: {
      splitRule: '/',
    },
  },
  producer: {
    enable: true,
    replace: true,
    match: {
      mode: MATCH_MODE.FUZZY,
      exact: {
        checkPercentage: 60,
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
      splitRule: /(?:[/]|[,，])/iu,
    },
  },
} as const
