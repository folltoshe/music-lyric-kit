import { Match } from './match'

export interface Meta {
  tag?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * people name
     */
    name?: {
      split?: {
        /**
         * @default "/"
         */
        rule?: string | RegExp
      }
    }
  }
  producer?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * @default true
     */
    replace?: boolean
    /**
     * only when it is matched will it be used as the correct role
     */
    match?: Match
    /**
     * role name options
     */
    role?: {
      replace?: {
        /**
         * @default true
         */
        enable?: boolean
        /**
         * @default "by"
         */
        rule?: (string | RegExp)[]
      }
    }
    /**
     * people name options
     */
    name?: {
      split?: {
        /**
         * @default "/"
         */
        rule?: string | RegExp
      }
    }
  }
}
