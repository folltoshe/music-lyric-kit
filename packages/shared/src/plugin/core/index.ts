import type { DeepPartial, DeepRequired } from '@root/utils'
import type { LyricInfo } from '@root/lyric'
import type { CommonOptions } from '@root/options'
import type { Context, MusicInfoProps } from '../types'

import { COMMON_OPTIONS } from '@root/options'

import { ConfigManager } from '@root/options'

export abstract class BasePlugin<T extends Record<string, any>, Props> {
  protected context: Context<T>

  constructor(def: DeepRequired<T>, global?: ConfigManager<CommonOptions>) {
    this.context = {
      common: {
        global: !!global,
        options: global || new ConfigManager(COMMON_OPTIONS),
      },
      plugin: {
        options: new ConfigManager(def),
      },
    }
  }

  public updateCommonOptions(target: DeepPartial<CommonOptions>) {
    if (this.context.common.global) {
      console.warn(`this plugin is use global common options, skip update.`)
      return
    }
    this.context.common.options.set(target)
  }

  public updatePluginOptions(target: DeepPartial<T>) {
    this.context.plugin.options.set(target)
  }

  abstract parse(props: Props, musicInfo: MusicInfoProps): LyricInfo | null

  abstract export(info: LyricInfo): string
}
