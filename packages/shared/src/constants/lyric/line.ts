import type { Line, Dynamic } from '@root/types'

import { EMPTY_TIME_INFO } from './time'

import { freezeDeep } from '@root/utils'

export const LYRIC_LINE_TYPES: Record<Line.Type, Line.Type> = {
  NORMAL: 'NORMAL',
  INTERLUDE: 'INTERLUDE',
  BACKGROUND: 'BACKGROUND',
} as const
freezeDeep(LYRIC_LINE_TYPES)

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
freezeDeep(EMPTY_DYNAMIC_ITEM)

export const EMPTY_DYNAMIC_INFO: Dynamic.Info = {
  time: EMPTY_TIME_INFO,
  items: [],
} as const
freezeDeep(EMPTY_DYNAMIC_INFO)

export const EMPTY_LINE_ITEM: Line.Item = {
  id: '',
  type: LYRIC_LINE_TYPES.NORMAL,
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
freezeDeep(EMPTY_LINE_ITEM)

export const EMPTY_LINE_INFO: Line.Info = {
  total: 0,
  items: [],
} as const
freezeDeep(EMPTY_LINE_INFO)
