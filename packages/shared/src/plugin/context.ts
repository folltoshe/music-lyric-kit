import { ConfigManager } from '@root/config'

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
