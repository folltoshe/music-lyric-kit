import type { TimeInfo } from './time'
import type { MetaInfo } from './meta'
import type { GroupInfo, GroupItem, GroupLine } from './group'
import type { Dynamic, Extended, Line } from './line'

export type { TimeInfo }
export type { MetaInfo }
export type { GroupInfo, GroupItem, GroupLine }
export type { Dynamic, Extended, Line }

export interface LyricConfig {
  /** is instrumental music (may) */
  isInstrumental: boolean
  /** is support auto scroll lyric (no lyric time info) */
  isSupportAutoScroll: boolean
}

export interface LyricConfig {
  config: LyricConfig
  group: GroupInfo
  meta: MetaInfo
  line: Line.Info
}
