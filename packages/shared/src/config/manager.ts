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

  private processCommon(key: any) {
    const comm = get(this.current, key as T)
    const def = get(this.default, key as T)
    return merge({}, def, comm)
  }

  get(): T
  get<K extends NestedKeys<DeepRequired<T>>>(key: K): PathValue<T, K>
  get<K extends NestedKeys<DeepRequired<T>>>(key: K, common?: K): PathValue<T, K>
  get<K extends T | undefined>(key?: K, common?: K): any {
    if (!key) {
      return merge({}, this.default, this.current)
    }

    const current = get(this.current, key as T)
    if (current !== void 0 && typeof current !== 'object') {
      return current
    }

    const def = get(this.default, key as T)
    const comm = common ? this.processCommon(common) : null

    return merge({}, def, comm, current)
  }

  set(opt: DeepPartial<T>) {
    if (!opt) return
    this.current = merge(this.current, opt)
  }
}
