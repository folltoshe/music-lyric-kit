import type { PathValue, NestedKeys, DeepRequired, DeepPartial } from '@root/utils'

import { get, merge } from '@root/utils'

export class ConfigManager<T extends Record<string, any>> {
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

  get(): T
  get<K extends NestedKeys<DeepRequired<T>>>(key: K): PathValue<DeepRequired<T>, K>
  get<RK extends DeepRequired<T>, K extends RK | undefined>(key?: K): any {
    if (!key) {
      return this.current
    }

    const current = get(this.current, key as RK)
    if (current !== void 0) {
      return current
    }

    return get(this.default, key as RK)
  }

  set(opt: DeepPartial<T>) {
    if (!opt) return
    this.current = merge(this.current, opt)
  }
}
