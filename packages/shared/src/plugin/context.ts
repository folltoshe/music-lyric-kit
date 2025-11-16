import { ConfigManager } from '@root/config'

export type ConfigType = Record<string, any>

export interface Context<Plugin extends ConfigType, Common extends ConfigType> {
  config: ConfigManager<Plugin, Common>
}
