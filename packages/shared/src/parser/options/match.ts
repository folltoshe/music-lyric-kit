import type { ValueOf } from '@root/common'
import type { MATCH_MODE } from '@root/common'

export interface CommonMatchOptions {
  /**
   * match mode
   * @default FUZZY
   */
  mode?: ValueOf<typeof MATCH_MODE>
  /**
   * exact mode options
   */
  exact?: {
    /**
     * check options
     */
    check?: {
      /**
       * need more than this percentage
       * @default 50
       */
      percentage?: number
    }
  }
  /**
   * fuzzy mode options
   */
  fuzzy?: {}
  /**
   * common check rules
   */
  rule?: {
    /**
     * is use default rule
     * @default true
     */
    useDefault?: boolean
    /**
     * custom rule, it will be merge with default when useDefault is enable
     * @default []
     */
    custom?: (string | RegExp)[]
  }
}
