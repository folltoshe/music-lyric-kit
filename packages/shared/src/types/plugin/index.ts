import type { DeepRequired } from '../utils'
import type { LyricInfo } from '../lyric'
import type { CommonOptionsRequired } from '../options'

import { COMMON_OPTIONS } from '@root/constants'

import { OptionsManager } from '@root/utils'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export interface Context<T extends Record<string, any>> {
  options: {
    common: OptionsManager<CommonOptionsRequired>
    plugin: OptionsManager<T>
  }
}

export type ContextCommon = Context<any>

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

  abstract parse(props: Props, musicInfo: MusicInfoProps): LyricInfo

  abstract export(info: LyricInfo): string
}
