type IsPlainObject<T> = T extends object ? (T extends Function ? false : T extends readonly any[] ? false : true) : false

type JoinKey<K extends string, P extends string> = P extends '' ? K : `${K}.${P}`

type SplitKey<S extends string, D extends string = '.'> = S extends ''
  ? []
  : S extends `${infer Head}${D}${infer Rest}`
  ? [Head, ...SplitKey<Rest, D>]
  : [S]

type PathValueByKeys<T, Keys extends readonly string[]> = Keys extends [infer Head, ...infer Tail]
  ? Head extends keyof T
    ? Tail extends []
      ? T[Head]
      : PathValueByKeys<NonNullable<T[Head]>, Extract<Tail, string[]>>
    : undefined
  : T

export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: IsPlainObject<T[K]> extends true ? K | JoinKey<K, Extract<NestedKeys<T[K]>, string>> : K
    }[keyof T & string]
  : never

export type PathValue<T, K extends string> = PathValueByKeys<T, SplitKey<K>>
