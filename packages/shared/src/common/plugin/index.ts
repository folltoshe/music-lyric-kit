import type { DeepPartial, DeepRequired } from '@root/common'

import { ConfigManager } from '@root/common/options'

export type ConfigType = Record<string, any>

export interface Context<PluginConfig extends ConfigType, CommonConfig extends ConfigType> {
  common: {
    global: boolean
    options: ConfigManager<CommonConfig>
  }
  plugin: {
    options: ConfigManager<PluginConfig>
  }
}

export abstract class BasePlugin<PluginConfig extends ConfigType, CommonConfig extends ConfigType> {
  protected context: Context<PluginConfig, CommonConfig>

  constructor(def: DeepRequired<PluginConfig>, commonDef: DeepRequired<CommonConfig>, commonGlobal?: ConfigManager<CommonConfig>) {
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

  public updateCommonOptions(target: DeepPartial<CommonConfig>) {
    if (this.context.common.global) {
      console.warn('this plugin is use global common options, skip update.')
      return
    }
    this.context.common.options.set(target)
  }

  public updatePluginOptions(target: DeepPartial<PluginConfig>) {
    this.context.plugin.options.set(target)
  }
}
