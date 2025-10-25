import type { CommonMatchOptions } from './match'

export interface CommonMetaOptions {
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
    match?: CommonMatchOptions
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
