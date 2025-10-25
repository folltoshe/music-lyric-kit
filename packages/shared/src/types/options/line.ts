import type { InsertTextSpaceTypes } from '@root/utils'

import type { CommonMatchOptions } from './match'

export interface CommonInterludeOptions {
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

export interface CommonDuetOptions {
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

export interface CommonLineOptions {
  purification?: {
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
