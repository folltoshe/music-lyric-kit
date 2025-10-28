import type { ConfigManager, ConfigType, Context } from '@root/common'
import type { DeepRequired } from '@root/common'
import type { LyricInfo } from '@root/common/lyric'
import type { CommonExporterOptions } from './options'

import { COMMON_EXPORTER_OPTIONS } from './options'

import { BasePlugin } from '@root/common'

export type ExporterCommonContext = Context<any, CommonExporterOptions>

export abstract class BaseExporterPlugin<
  PluginConfig extends ConfigType,
  Params = LyricInfo,
  Result = null | undefined | string | Uint8Array
> extends BasePlugin<PluginConfig, CommonExporterOptions> {
  constructor(def: DeepRequired<PluginConfig>, global?: ConfigManager<CommonExporterOptions>) {
    super(def, COMMON_EXPORTER_OPTIONS, global)
  }

  abstract export(params: Params): Result
}
