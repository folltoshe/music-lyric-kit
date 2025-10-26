import type { DeepRequired } from '@root/utils'
import type { InsertTextSpaceTypes } from '@root/utils'
import type { CommonMatchOptions } from './match'

import { INSERT_TEXT_SPACE_TYPES, MATCH_MODE } from '@root/utils'

export interface CommonParserInterludeOptions {
  /**
   * is show interlude line
   * @default true
   */
  enable?: boolean
  /**
   * If the interval between lyrics lines exceeds this number, it is considered an interlude
   * @default 10000
   */
  checkTime?: number
  /**
   * If the first line lasts longer than this number, add an interlude line forward.
   * @default 5000
   */
  firstLineCheckTime?: number
}
export const COMMON_PARSER_INTERLUDE_OPTIONS: DeepRequired<CommonParserInterludeOptions> = {
  enable: true,
  checkTime: 10000,
  firstLineCheckTime: 5000,
} as const

export interface CommonParserDuetOptions {
  /**
   * is enable insert duet info
   * @default true
   */
  enable?: boolean
  /**
   * replace match line when enable
   * @default true
   */
  replace?: boolean
}
export const COMMON_PARSER_DUET_OPTIONS: DeepRequired<CommonParserDuetOptions> = {
  enable: true,
  replace: true,
} as const

export interface CommonParserPurificationOptions {
  /**
   * is enable purification lyric
   * @default true
   */
  enable?: boolean
  /**
   * match options
   */
  match?: CommonMatchOptions
  /**
   * some lyrics have the song title and singer as the first line
   */
  firstLine: CommonMatchOptions & {
    /**
     * is use music info to match
     * @default true
     */
    useMusicInfo?: boolean
  }
}
export const COMMON_PARSER_PURIFICATION_OPTIONS: DeepRequired<CommonParserPurificationOptions> = {
  enable: true,
  match: {
    mode: MATCH_MODE.FUZZY,
    exact: {
      check: {
        percentage: 50,
      },
    },
    fuzzy: {},
    rule: {
      useDefault: true,
      custom: [],
    },
  },
  firstLine: {
    useMusicInfo: true,
    mode: MATCH_MODE.EXACT,
    exact: {
      check: {
        percentage: 30,
      },
    },
    fuzzy: {},
    rule: {
      useDefault: true,
      custom: [],
    },
  },
}

export interface CommonParserLineOptions {
  replace?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * replace chinese punctuation to english
     */
    punctuation?: boolean
  }
  insert?: {
    /**
     * insert space
     */
    space?: {
      /**
       * @default true
       */
      enable?: boolean
      /**
       * @default TextSpacerProcessType.ALL
       */
      types?: InsertTextSpaceTypes[]
    }
  }
  prolongedSound?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * If the duration of the word exceeds this number, add trailing
     * @unit ms
     * @default 1000
     */
    checkTime?: number
  }
}
export const COMMON_PARSER_LINE_OPTIONS: DeepRequired<CommonParserLineOptions> = {
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
