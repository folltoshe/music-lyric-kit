import { ConfigManager } from '@root/config'

export type ConfigType = Record<string, any>

export interface Context<PluginConfig extends ConfigType, CommonConfig extends ConfigType> {
  common: {
    global: boolean
    config: ConfigManager<CommonConfig>
  }
  plugin: {
    config: ConfigManager<PluginConfig>
  }
}
