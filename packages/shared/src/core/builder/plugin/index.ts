import type { ConfigManager } from '@root/config'
import type { ConfigType, Context } from '@root/plugin'
import type { Info } from '@root/core/lyric'

import type { Full } from '../config'
import { FULL } from '../config'

import { BasePlugin } from '@root/plugin'

export type CommonContext = Context<any, Full>

export abstract class Base<PluginConfig extends ConfigType, Params = Info, Result = null | undefined | string | Uint8Array> extends BasePlugin<
  PluginConfig,
  Full
> {
  constructor(def: PluginConfig, global?: ConfigManager<Full>) {
    super(def, FULL, global)
  }

  abstract build(params: Params): Result
}
