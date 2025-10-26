import type { CommonOptions, ConfigManager } from '@root/options'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export interface Context<T extends Record<string, any>> {
  common: {
    global: boolean
    options: ConfigManager<CommonOptions>
  }
  plugin: {
    options: ConfigManager<T>
  }
}

export type ContextCommon = Context<any>
