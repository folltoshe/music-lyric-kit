export type ValueOf<T extends object> = T[keyof T]

// deep

type SkipDeepBuiltins = RegExp | Date | Error | Blob | File | URL | ArrayBuffer | SharedArrayBuffer | DataView

export type DeepRequired<T> = T extends (...args: any[]) => any
  ? T
  : T extends SkipDeepBuiltins
  ? NonNullable<T>
  : T extends Promise<infer U>
  ? Promise<DeepRequired<NonNullable<U>>>
  : T extends readonly any[]
  ? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
  : T extends Array<infer U>
  ? Array<DeepRequired<NonNullable<U>>>
  : T extends Map<infer K, infer V>
  ? Map<DeepRequired<NonNullable<K>>, DeepRequired<NonNullable<V>>>
  : T extends Set<infer U>
  ? Set<DeepRequired<NonNullable<U>>>
  : T extends object
  ? { [K in keyof T]-?: DeepRequired<NonNullable<T[K]>> }
  : NonNullable<T>

export type DeepPartial<T> = T extends (...args: any[]) => any
  ? T
  : T extends Map<infer K, infer V>
  ? Map<DeepPartial<K>, DeepPartial<V>>
  : T extends Set<infer U>
  ? Set<DeepPartial<U>>
  : T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T

export type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer U>
  ? ReadonlySet<DeepReadonly<U>>
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T

// key

type IsPlainObject<T> = T extends object
  ? T extends Date | RegExp | Map<any, any> | Set<any> | Function | readonly any[]
    ? false
    : T extends { [key: string]: any }
    ? true
    : false
  : false

type SplitKey<S extends string, D extends string = '.', Result extends string[] = []> = S extends `${infer Head}${D}${infer Rest}`
  ? SplitKey<Rest, D, [...Result, Head]>
  : S extends ''
  ? Result
  : [...Result, S]

type PathValueByKeys<T, Keys extends readonly string[]> = Keys extends [infer Head, ...infer Tail]
  ? Head extends keyof T
    ? Tail extends []
      ? T[Head]
      : T[Head] extends null | undefined
      ? undefined
      : PathValueByKeys<T[Head], Extract<Tail, string[]>>
    : undefined
  : T

export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T & string]: IsPlainObject<T[K]> extends true ? K | JoinKey<K, Extract<NestedKeys<NonNullable<T[K]>>, string>> : K
    }[keyof T & string]
  : never

export type PathValue<T, K extends string> = PathValueByKeys<T, SplitKey<K>>

type JoinKey<K extends string, P extends string> = P extends '' ? K : `${K}.${P}`
