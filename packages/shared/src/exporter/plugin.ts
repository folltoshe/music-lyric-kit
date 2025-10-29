import type { ConfigManager, ConfigType, Context } from '@root/common'
import type { DeepRequired } from '@root/common'
import type { LyricInfo } from '@root/common/lyric'

import type { Full as CommonOptions } from './config'
import { FULL as COMMON_OPTIONS } from './config'

import { BasePlugin } from '@root/common'

export type CommonContext = Context<any, CommonOptions>

export abstract class Base<PluginConfig extends ConfigType, Params = LyricInfo, Result = null | undefined | string | Uint8Array> extends BasePlugin<
  PluginConfig,
  CommonOptions
> {
  constructor(def: DeepRequired<PluginConfig>, global?: ConfigManager<CommonOptions>) {
    super(def, COMMON_OPTIONS, global)
  }

  abstract export(params: Params): Result
}
