export interface GroupInfo {
  /** item count */
  total: number
  /** item list */
  items: GroupItem[]
}

export interface GroupItem {
  /** id (crc32) */
  id: string
  /** name */
  name: string
  /** total count */
  total: number
}

export interface GroupLine {
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
