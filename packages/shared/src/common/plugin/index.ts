import type { DeepPartial, DeepRequired } from '@root/common'

import { ConfigManager } from '@root/common/options'

export type ConfigType = Record<string, any>

export interface Context<P extends ConfigType, C extends ConfigType> {
  common: {
    global: boolean
    options: ConfigManager<C>
  }
  plugin: {
    options: ConfigManager<P>
  }
}

export abstract class BasePlugin<P extends ConfigType, C extends ConfigType> {
  protected context: Context<P, C>

  constructor(def: DeepRequired<P>, commonDef: DeepRequired<C>, commonGlobal?: ConfigManager<C>) {
    this.context = {
      common: {
        global: !!commonGlobal,
        options: commonGlobal || new ConfigManager(commonDef),
      },
      plugin: {
        options: new ConfigManager(def),
      },
    }
  }

  public updateCommonOptions(target: DeepPartial<C>) {
    if (this.context.common.global) {
      console.warn(`this plugin is use global common options, skip update.`)
      return
    }
    this.context.common.options.set(target)
  }

  public updatePluginOptions(target: DeepPartial<P>) {
    this.context.plugin.options.set(target)
  }
}
