import type { TimeInfo } from './time'
import type { GroupLine } from './group'

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
    words: WordItem[]
  }
}

export namespace Line {
  export type Type = 'NORMAL' | 'BACKGROUND' | 'INTERLUDE'

  export interface Content extends BaseContent {
    dynamic?: Dynamic.Info
  }

  export interface Item {
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

  export interface Info {
    /** item count */
    total: number
    /** item list */
    items: Item[]
  }
}
