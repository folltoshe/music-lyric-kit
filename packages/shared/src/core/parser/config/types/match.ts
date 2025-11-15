import type { ValueOf } from '@root/utils'

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
