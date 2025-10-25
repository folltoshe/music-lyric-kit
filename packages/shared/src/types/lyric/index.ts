import type { TimeInfo } from './time'
import type { MetaInfo, ProducerItem } from './meta'
import type { GroupItem, GroupLine } from './group'
import type { Dynamic, Extended, Line } from './line'

export type { TimeInfo }
export type { MetaInfo, ProducerItem }
export type { GroupItem, GroupLine }
export type { Dynamic, Extended, Line }

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
