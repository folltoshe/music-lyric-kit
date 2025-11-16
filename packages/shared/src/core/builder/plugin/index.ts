import type { ConfigManager } from '@root/config'
import type { ConfigType, Context } from '@root/plugin'
import type { Info } from '@root/core/target'
import type { DeepPartial } from '@root/utils'

import type { Full } from '../config'
import { FULL } from '../config'

import { BasePlugin } from '@root/plugin'

export type CommonContext = Context<any, Full>

export abstract class Base<Config extends ConfigType, Params = Info, Result = null | undefined | string | Uint8Array> extends BasePlugin<
  Config,
  Full
> {
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

  abstract build(params: Params): Result
}
