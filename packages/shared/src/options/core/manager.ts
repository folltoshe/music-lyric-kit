import type { DeepPartial, PathValue, NestedKeys, DeepRequired } from '@root/utils'

import { get, merge } from '@root/utils'

export class OptionsManager<T extends Record<string, any>> {
  private default: DeepRequired<T>
  private current: T

  constructor(def: DeepRequired<T>, init?: T) {
    this.default = def
    if (init) {
      this.current = init
    } else {
      this.current = Object.create({})
    }
  }

  get<K extends NestedKeys<T>>(key: K): PathValue<DeepRequired<T>, K>
  get(): T
  get<K extends NestedKeys<T> | undefined>(key?: K): any {
    if (!key) {
      return this.current
    }

    const current = get(this.current, key as NestedKeys<T>)
    if (current !== void 0) {
      return current
    }

    return get(this.default, key as NestedKeys<T>)
  }

  set(opt: DeepPartial<T>) {
    if (!opt) return
    this.current = merge(this.current, opt)
  }
}
