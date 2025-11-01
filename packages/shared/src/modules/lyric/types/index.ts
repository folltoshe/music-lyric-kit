import type { Time } from './time'
import type { Meta, Producer } from './meta'
import type { GroupList, GroupItem, GroupLineInfo } from './group'
import type { Line } from './line'

export type { Time }
export type { Meta, Producer }
export type { GroupList, GroupItem, GroupLineInfo }
export type { Line }

export interface Config {
  /** is instrumental music (may) */
  isInstrumental: boolean
  /** is support auto scroll lyric (no lyric time info) */
  isSupportAutoScroll: boolean
}

export interface Info {
  config: Config
  meta: Meta
  lines: Line.Info[]
  groups: GroupList
}
