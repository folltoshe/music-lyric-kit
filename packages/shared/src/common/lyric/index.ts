import type { TimeInfo } from './time'
import type { MetaInfo, ProducerItem } from './meta'
import type { GroupItem, GroupLine } from './group'
import type { Dynamic, Extended, Line } from './line'

import { EMPTY_TIME_INFO } from './time'
import { LINE_TYPES, EMPTY_DYNAMIC_INFO, EMPTY_DYNAMIC_ITEM, EMPTY_LINE_ITEM } from './line'

export type { TimeInfo }
export type { MetaInfo, ProducerItem }
export type { GroupItem, GroupLine }
export type { Dynamic, Extended, Line }

export { EMPTY_TIME_INFO }
export { LINE_TYPES, EMPTY_DYNAMIC_INFO, EMPTY_DYNAMIC_ITEM, EMPTY_LINE_ITEM }

export interface LyricConfig {
  /** is instrumental music (may) */
  isInstrumental: boolean
  /** is support auto scroll lyric (no lyric time info) */
  isSupportAutoScroll: boolean
}

export interface LyricInfo {
  config: LyricConfig
  meta: MetaInfo
  lines: Line.Info[]
  groups: GroupItem[]
}

export const EMPTY_LYRIC_INFO: LyricInfo = {
  config: {
    isInstrumental: false,
    isSupportAutoScroll: false,
  },
  meta: {
    offset: {
      raw: '',
      parsed: 0,
    },
  },
  lines: [],
  groups: [],
} as const
