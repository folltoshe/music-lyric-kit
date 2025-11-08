import type { DeepPartial } from '@root/utils'
import type { Context, ConfigType } from './context'

import { ConfigManager } from '@root/config'

export abstract class BasePlugin<PluginConfig extends ConfigType, CommonConfig extends ConfigType> {
  protected context: Context<PluginConfig, CommonConfig>

  constructor(def: PluginConfig, commonDef: CommonConfig, commonGlobal?: ConfigManager<CommonConfig>) {
    this.context = {
      common: {
        global: !!commonGlobal,
        config: commonGlobal || new ConfigManager(commonDef),
      },
      plugin: {
        config: new ConfigManager(def),
      },
    }
  }

  public updateCommonConfig(target: DeepPartial<CommonConfig>) {
    if (this.context.common.global) {
      console.warn('this plugin is use global common config, skip update.')
      return
    }
    this.context.common.config.set(target)
  }

  public updatePluginConfig(target: DeepPartial<PluginConfig>) {
    this.context.plugin.config.set(target)
  }
}
