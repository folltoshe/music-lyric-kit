import type { DeepPartial, DeepRequired } from '@root/utils'
import type { LyricInfo } from '@root/lyric'
import type { CommonOptions } from '@root/options'
import type { Context, MusicInfoProps } from '../types'

import { COMMON_OPTIONS } from '@root/options'

import { OptionsManager } from '@root/options'

export abstract class BasePlugin<Options extends Record<string, any>, Props> {
  protected context: Context<Options>

  constructor(defaultConfig: DeepRequired<Options>) {
    this.context = {
      options: {
        common: new OptionsManager(COMMON_OPTIONS),
        plugin: new OptionsManager(defaultConfig),
      },
    }
  }

  public updateCommonOptions(options: DeepPartial<CommonOptions>) {
    this.context.options.common.set(options)
  }

  public updatePluginOptions(options: DeepPartial<Options>) {
    this.context.options.plugin.set(options)
  }

  abstract parse(props: Props, musicInfo: MusicInfoProps): LyricInfo | null

  abstract export(info: LyricInfo): string
}
