import type { TimeInfo } from './time'
import type { GroupLine } from './group'

import { EMPTY_TIME_INFO } from './time'

interface BaseContent {
  original: string
  extended?: Extended.Info[]
}

export namespace Extended {
  export type Type = 'TRANSLATE' | 'ROMAN' | 'UNKNOWN'

  export interface Info {
    type: Type
    content: string
  }
}

export namespace Dynamic {
  export interface WordItem {
    /** time info (relative to the time of this lyrics) */
    time: TimeInfo
    content: BaseContent
    config: {
      space: {
        /** need space in word start, if line postion in right, you need use it */
        start: boolean
        /** need space in word end, if line postion in left, you need use it */
        end: boolean
      }
      isProlongedSound: boolean
    }
  }

  export interface Info {
    /** time info (relative to the time of this lyrics) */
    time: TimeInfo
    items: WordItem[]
  }
}

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

export namespace Line {
  export type Type = 'NORMAL' | 'BACKGROUND' | 'INTERLUDE'

  export interface Content extends BaseContent {
    dynamic?: Dynamic.Info
  }

  export interface Info {
    /** line id */
    id: string
    /** line type */
    type: Type
    /** time info (relative to the time of this lyrics) */
    time: TimeInfo
    /** duet group info */
    group: GroupLine
    /** line content */
    content: Content
  }
}

export const LINE_TYPES: Record<Line.Type, Line.Type> = {
  NORMAL: 'NORMAL',
  INTERLUDE: 'INTERLUDE',
  BACKGROUND: 'BACKGROUND',
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
