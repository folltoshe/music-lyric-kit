import type { DeepPartial } from '@root/utils'
import type { Context, ConfigType } from './context'

import { ConfigManager } from '@root/config'

export abstract class BasePlugin<PluginConfig extends ConfigType, CommonConfig extends ConfigType> {
  protected context: Context<PluginConfig, CommonConfig>

  constructor(params: {
    plugin: {
      default: PluginConfig
      init?: DeepPartial<PluginConfig>
    }
    common: {
      default: CommonConfig
      client?: ConfigManager<CommonConfig>
    }
  }) {
    const common =
      params.common.client ||
      new ConfigManager({
        current: {
          default: params.common.default,
        },
      })
    this.context = {
      config: new ConfigManager({
        current: {
          default: params.plugin.default,
          init: params.plugin.init,
        },
        common,
      }),
    }
  }

  public updateConfig(target: DeepPartial<PluginConfig>) {
    this.context.config.set(target)
  }
}
