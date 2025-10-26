export type * from './deep'
export type * from './key'

export type ValueOf<T extends object> = T[keyof T]
