import type { PathValue, NestedKeys, DeepPartial } from '@root/utils'

import { get, merge } from '@root/utils'

type ConfigType = Record<string, any>

export class ConfigManager<T extends ConfigType, C extends ConfigType = ConfigType> {
  private default: T
  private current: DeepPartial<T>
  private common?: ConfigManager<C>

  constructor({
    current,
    common,
  }: {
    current: {
      default: T
      init?: DeepPartial<T>
    }
    common?: ConfigManager<C>
  }) {
    this.default = current.default
    this.common = common
    if (current.init) {
      this.current = current.init
    } else {
      this.current = Object.create({})
    }
  }

  get(): C & T
  get<R extends C & T, K extends NestedKeys<R>>(key: K): PathValue<R, K>
  get(key?: T | undefined): any {
    if (!key) {
      return merge({}, this.default, this.common, this.current)
    }

    const current = get(this.current, key as any)
    if (current !== void 0 && typeof current !== 'object') {
      return current
    }

    const common = this.common?.get(key as any)
    if (common !== void 0 && typeof common !== 'object') {
      return common
    }

    const def = get(this.default, key as any)
    if (def !== void 0 && typeof def !== 'object') {
      return def
    }

    return merge({}, def, common, current)
  }

  set<R extends C & T>(opt: DeepPartial<R>) {
    if (!opt) return
    this.current = merge(this.current, opt)
  }
}
