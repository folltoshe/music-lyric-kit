import type { DeepRequired } from '@root/utils'
import type { Line } from '../types'

import { INSERT_TEXT_SPACE_TYPES } from '@root/utils'

export const LINE: DeepRequired<Line> = {
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
