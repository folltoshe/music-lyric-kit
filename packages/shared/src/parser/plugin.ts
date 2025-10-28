import type { ConfigManager, ConfigType, Context } from '@root/common'
import type { DeepRequired } from '@root/common'
import type { LyricInfo } from '@root/common/lyric'
import type { CommonParserOptions } from './options'

import { COMMON_PARSER_OPTIONS } from './options'

import { BasePlugin } from '@root/common'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export type ParserCommonContext = Context<any, CommonParserOptions>

export abstract class BaseParserPlugin<
  PluginConfig extends ConfigType,
  Params = ConfigType,
  Result = null | undefined | LyricInfo
> extends BasePlugin<PluginConfig, CommonParserOptions> {
  constructor(def: DeepRequired<PluginConfig>, global?: ConfigManager<CommonParserOptions>) {
    super(def, COMMON_PARSER_OPTIONS, global)
  }

  abstract parse(props: Params): Result
}
