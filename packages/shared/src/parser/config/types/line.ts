import type { InsertTextSpaceTypes } from '@root/common'

export interface Line {
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
