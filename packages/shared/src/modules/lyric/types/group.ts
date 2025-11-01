export interface GroupItem {
  /** id (crc32) */
  id: string
  /** name */
  name: string
  /** total count */
  total: number
}

export type GroupList = GroupItem[]

export interface GroupLineInfo {
  /** id (crc32) */
  id: string
  /** index info */
  index: {
    /** index in global */
    global: number
    /** index in this block */
    block: number
  }
}
