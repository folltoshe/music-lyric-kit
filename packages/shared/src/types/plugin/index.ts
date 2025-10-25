import type { DeepRequired } from '../utils'
import type { LyricInfo } from '../lyric'

import { OptionsManager } from '@root/utils'

export interface Context<Options extends Record<string, any>> {
  options: OptionsManager<Options>
}

export abstract class BasePlugin<Options extends Record<string, any>, Props> {
  protected context: Context<DeepRequired<Options>>

  constructor(defaultConfig: DeepRequired<Options>) {
    this.context = {
      options: new OptionsManager(defaultConfig),
    }
  }

  abstract parse(props: Props): LyricInfo

  abstract export(info: LyricInfo): string
}
