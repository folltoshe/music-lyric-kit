import type { DeepRequired } from '@root/types'
import type { LyricInfo } from '@root/types'
import type { Context, MusicInfoProps } from '@root/types'

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

  abstract parse(props: Props, musicInfo: MusicInfoProps): LyricInfo | null

  abstract export(info: LyricInfo): string
}
