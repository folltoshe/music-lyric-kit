import type { DeepPartial, DeepRequired, InsertTextSpaceTypes, ValueOf } from '@root/utils'
import type { MATCH_MODE } from '@root/utils'

export interface Match {
  /**
   * match mode
   * @default FUZZY
   */
  mode: ValueOf<typeof MATCH_MODE>
  /**
   * exact mode options
   */
  exact: {
    /**
     * need more than this percentage
     * @default 50
     */
    checkPercentage: number
  }
  /**
   * fuzzy mode options
   */
  fuzzy: {}
  /**
   * common check rules
   */
  rule: {
    /**
     * is use default rule
     * @default true
     */
    useDefault: boolean
    /**
     * custom rule, it will be merge with default when useDefault is enable
     * @default []
     */
    custom: (string | RegExp)[]
  }
}

export namespace Content {
  export interface Purification {
    /**
     * is enable purification lyric
     * @default true
     */
    enable: boolean
    /**
     * match options
     */
    match: Match
    /**
     * some lyrics have the song title and singer as the first line
     */
    firstLine: Match & {
      /**
       * is use music info to match
       * @default true
       */
      useMusicInfo: boolean
    }
  }

  export interface Interlude {
    /**
     * is show interlude line
     * @default true
     */
    enable: boolean
    /**
     * If the interval between lyrics lines exceeds this number, it is considered an interlude
     * @default 10000
     */
    checkTime: number
    /**
     * If the first line lasts longer than this number, add an interlude line forward.
     * @default 5000
     */
    firstLineCheckTime: number
  }

  export interface Duet {
    /**
     * is enable insert duet info
     * @default true
     */
    enable: boolean
    /**
     * replace match line when enable
     * @default true
     */
    replace: boolean
  }
}

export namespace Line {
  export interface Common {
    replace: {
      /**
       * is replace chinese punctuation to english
       * @default true
       */
      punctuation: boolean
    }
    insert: {
      /**
       * is enable all insert
       * @default true
       */
      enable: boolean
      /**
       * insert space
       */
      space: {
        /**
         * enable insert space
         * @default true
         */
        enable: boolean
        /**
         * @default TextSpacerProcessType.ALL
         */
        types: InsertTextSpaceTypes[]
      }
    }
  }

  export type Main = Common & {
    insert: {
      prolonged: {
        /**
         * @default true
         */
        enable: boolean
        /**
         * If the duration of the word exceeds this number, add prolonged sound
         * @unit ms
         * @default 1000
         */
        checkTime: number
      }
    }
  }

  export type Extended = Common & {}
}

export interface Meta {}

export interface Full {
  meta: Meta
  content: {
    purification: Content.Purification
    interlude: Content.Interlude
    duet: Content.Duet
  }
  line: {
    main: Line.Main
    extended: Line.Extended
  }
}

export type FullRequired = DeepRequired<Full>

export type FullPartial = DeepPartial<Full>
