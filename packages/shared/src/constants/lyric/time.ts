import type { TimeInfo } from '@root/types'

import { freezeDeep } from '@root/utils'

export const EMPTY_TIME_INFO: TimeInfo = {
  start: 0,
  end: 0,
  duration: 0,
} as const
freezeDeep(EMPTY_TIME_INFO)
