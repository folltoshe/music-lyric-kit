import type { Line } from '../types'

import { EMPTY_TIME } from './time'

export const LINE_TYPES: Record<Line.Type, Line.Type> = {
  NORMAL: 'NORMAL',
  INTERLUDE: 'INTERLUDE',
} as const

export const EMPTY_WORD_ITEM: Line.Word = {
  time: EMPTY_TIME,
  content: {
    original: '',
  },
  config: {
    needSpaceStart: false,
    needSpaceEnd: false,
    isProlongedSound: false,
  },
}

export const EMPTY_LINE_INFO: Line.Info = {
  id: '',
  type: LINE_TYPES.NORMAL,
  time: EMPTY_TIME,
  content: {
    words: [],
    original: '',
  },
} as const
