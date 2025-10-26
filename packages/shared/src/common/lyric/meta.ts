interface Item<T> {
  /** raw content */
  raw: string
  /** processed */
  parsed: T
}

export interface ProducerItem {
  role: Item<string>
  name: Item<string[]>
}

export interface MetaInfo {
  offset: Item<number>
  title?: Item<string>
  album?: Item<string>
  duration?: Item<number>
  artist?: Item<string[]>
  author?: Item<string[]>
  producer?: ProducerItem[]
}
