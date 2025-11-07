import type { Time } from './time'
import type { GroupLineInfo } from './group'

export namespace Line {
  export type Type = 'NORMAL' | 'INTERLUDE'

  export namespace Extended {
    export type Type = 'TRANSLATE' | 'ROMAN' | 'UNKNOWN'

    export interface Info {
      type: Type
      content: string
    }
  }

  interface BaseContent {
    original: string
    extended?: Extended.Info[]
  }

  export namespace Dynamic {
    export interface Item {
      /** time info (relative to the time of this lyrics) */
      time: Time
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
      time: Time
      items: Item[]
    }
  }

  export interface Content extends BaseContent {
    dynamic?: Dynamic.Info
  }

  export interface Info {
    /** line id */
    id: string
    /** line type */
    type: Type
    /** time info (relative to the time of this lyrics) */
    time: Time
    /** duet group info */
    group: GroupLineInfo
    /** line content */
    content: Content
    /** background lyric */
    background: Omit<Info, 'background'>[]
  }
}
