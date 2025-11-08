import type { PathValue, NestedKeys, DeepPartial, DeepRequired } from '@root/utils'

import { get, merge } from '@root/utils'

export class ConfigManager<T extends Record<string, any>> {
  private default: T
  private current: DeepPartial<T>

  constructor(def: T, init?: DeepPartial<T>) {
    this.default = def
    if (init) {
      this.current = init
    } else {
      this.current = Object.create({})
    }
  }

  get(): T
  get<K extends NestedKeys<DeepRequired<T>>>(key: K): PathValue<T, K>
  get<RK extends T, K extends RK | undefined>(key?: K): any {
    if (!key) {
      return this.current
    }

    const current = get(this.current, key as RK)
    if (current !== void 0 && typeof current !== 'object') {
      return current
    }

    const def = get(this.default, key as RK)
    return merge({}, def, current)
  }

  set(opt: DeepPartial<T>) {
    if (!opt) return
    this.current = merge(this.current, opt)
  }
}
