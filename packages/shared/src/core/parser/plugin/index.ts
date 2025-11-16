import type { ConfigManager } from '@root/config'
import type { ConfigType, Context } from '@root/plugin'
import type { Info } from '@root/core/target'
import type { DeepPartial } from '@root/utils'

import type { Full } from '../config'
import { FULL } from '../config'

import { BasePlugin } from '@root/plugin'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export type CommonContext = Context<{}, Full>

export abstract class Base<Config extends ConfigType, Params = ConfigType, Result = null | undefined | Info> extends BasePlugin<Config, Full> {
  constructor(def: Config, init?: DeepPartial<Config>, global?: ConfigManager<Full>) {
    super({
      plugin: {
        default: def,
        init,
      },
      common: {
        default: FULL,
        client: global,
      },
    })
  }

  abstract parse(props: Params): Result
}
