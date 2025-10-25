import type { Line, Dynamic } from '@root/types'

import { EMPTY_TIME_INFO } from './time'

export const LINE_TYPES: Record<Line.Type, Line.Type> = {
  NORMAL: 'NORMAL',
  INTERLUDE: 'INTERLUDE',
  BACKGROUND: 'BACKGROUND',
} as const

export const EMPTY_DYNAMIC_ITEM: Dynamic.WordItem = {
  time: EMPTY_TIME_INFO,
  content: {
    original: '',
  },
  config: {
    space: {
      start: false,
      end: false,
    },
    isProlongedSound: false,
  },
} as const

export const EMPTY_DYNAMIC_INFO: Dynamic.Info = {
  time: EMPTY_TIME_INFO,
  items: [],
} as const

export const EMPTY_LINE_ITEM: Line.Info = {
  id: '',
  type: LINE_TYPES.NORMAL,
  time: EMPTY_TIME_INFO,
  group: {
    id: '',
    index: {
      global: 0,
      block: 0,
    },
  },
  content: {
    original: '',
  },
} as const
