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

  export interface Word {
    time: Time
    content: {
      original: string
      extended?: Extended.Info[]
    }
    config: {
      /** need space in word start, if line postion in right, you need use it */
      needSpaceStart: boolean
      /** need space in word end, if line postion in left, you need use it */
      needSpaceEnd: boolean
      /** is long sound */
      isProlongedSound: boolean
    }
  }

  export interface Content {
    words: Word[]
    original: string
    extended?: Extended.Info[]
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
    background?: Info[]
  }
}
