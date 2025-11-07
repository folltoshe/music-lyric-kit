import type { Line } from '../types'

import { EMPTY_TIME } from './time'

export const EMPTY_DYNAMIC_ITEM: Line.Dynamic.Item = {
  time: EMPTY_TIME,
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

export const EMPTY_DYNAMIC_INFO: Line.Dynamic.Info = {
  time: EMPTY_TIME,
  items: [],
} as const

export const LINE_TYPES: Record<Line.Type, Line.Type> = {
  NORMAL: 'NORMAL',
  INTERLUDE: 'INTERLUDE',
} as const

export const EMPTY_LINE_INFO: Line.Info = {
  id: '',
  type: LINE_TYPES.NORMAL,
  time: EMPTY_TIME,
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
  background: [],
} as const
