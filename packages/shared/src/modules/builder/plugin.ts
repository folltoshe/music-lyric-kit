import type { ConfigManager } from '@root/config'
import type { ConfigType, Context } from '@root/plugin'
import type { DeepRequired } from '@root/utils'
import type { Info } from '@root/modules/lyric'

import type { Full as CommonOptions } from './config'
import { FULL as COMMON_OPTIONS } from './config'

import { BasePlugin } from '@root/plugin'

export type CommonContext = Context<any, CommonOptions>

export abstract class Base<PluginConfig extends ConfigType, Params = Info, Result = null | undefined | string | Uint8Array> extends BasePlugin<
  PluginConfig,
  CommonOptions
> {
  constructor(def: DeepRequired<PluginConfig>, global?: ConfigManager<CommonOptions>) {
    super(def, COMMON_OPTIONS, global)
  }

  abstract build(params: Params): Result
}
