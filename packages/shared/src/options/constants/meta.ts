import type { DeepRequired } from '@root/utils'
import type { CommonMetaOptions } from '../types'

export const COMMON_META_OPTIONS: DeepRequired<CommonMetaOptions> = {
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
      mode: 'FUZZY',
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
