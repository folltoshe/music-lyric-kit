interface Item<T> {
  /** raw content */
  raw: string
  /** processed */
  parsed: T
}

export interface Producer {
  role: Item<string>
  name: Item<string[]>
}

export interface Meta {
  offset: Item<number>
  duration?: Item<number>
  title?: Item<string>[]
  album?: Item<string>[]
  artist?: Item<string[]>[]
  author?: Item<string[]>[]
  producer?: Producer[]
}
