export type * from './lyric'
export type * from './options'
export type * from './plugin'
export type * from './utils'

export type ValueOf<T extends object> = T[keyof T]
