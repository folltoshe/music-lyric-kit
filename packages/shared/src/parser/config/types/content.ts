import type { Match } from './match'

export interface Interlude {
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

export interface Duet {
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

export interface Purification {
  /**
   * is enable purification lyric
   * @default true
   */
  enable?: boolean
  /**
   * match options
   */
  match?: Match
  /**
   * some lyrics have the song title and singer as the first line
   */
  firstLine: Match & {
    /**
     * is use music info to match
     * @default true
     */
    useMusicInfo?: boolean
  }
}
