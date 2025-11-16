import { MATCH_MODE } from '@music-lyric-kit/shared'
import { ConfigRequired } from './types'

export const DEFAULT_CONFIG: ConfigRequired = {
  meta: {
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
  },
} as const
