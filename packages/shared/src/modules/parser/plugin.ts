import type { ConfigManager } from '@root/config'
import type { ConfigType, Context } from '@root/plugin'
import type { Info } from '@root/lyric'

import type { Full } from './config'
import { FULL } from './config'

import { BasePlugin } from '@root/plugin'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export type CommonContext = Context<any, Full>

export abstract class Base<PluginConfig extends ConfigType, Params = ConfigType, Result = null | undefined | Info> extends BasePlugin<
  PluginConfig,
  Full
> {
  constructor(def: PluginConfig, global?: ConfigManager<Full>) {
    super(def, FULL, global)
  }

  abstract parse(props: Params): Result
}
