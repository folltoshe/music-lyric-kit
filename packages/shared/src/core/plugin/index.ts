import type { DeepPartial, DeepRequired } from '@root/types'
import type { LyricInfo, MusicInfoProps } from '@root/types'
import type { CommonOptions, Context } from '@root/types'

import { COMMON_OPTIONS } from '@root/constants'

import { OptionsManager } from '@root/utils'

export abstract class BasePlugin<Options extends Record<string, any>, Props> {
  protected context: Context<DeepRequired<Options>>

  constructor(defaultConfig: DeepRequired<Options>) {
    this.context = {
      options: {
        common: new OptionsManager(COMMON_OPTIONS),
        plugin: new OptionsManager(defaultConfig),
      },
    }
  }

  public updateCommonOptions(options: DeepPartial<CommonOptions>) {
    this.context.options.common.updateAll(options)
  }

  public updatePluginOptions(options: DeepPartial<Options>) {
    // @ts-expect-error
    this.context.options.plugin.updateAll(options)
  }

  abstract parse(props: Props, musicInfo: MusicInfoProps): LyricInfo | null

  abstract export(info: LyricInfo): string
}
