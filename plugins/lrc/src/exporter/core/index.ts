import type { ConfigManager, CommonParserOptions, LyricInfo } from '@music-lyric-kit/shared'
import type { LrcExporterOptions, LrcExporterProps, LrcExporterResult } from '@root/exporter/types'

import { DEFAULT_EXPORTER_OPTIONS } from '@root/exporter/constants'

import { BaseExporterPlugin } from '@music-lyric-kit/shared'

export class LrcExporter extends BaseExporterPlugin<LrcExporterOptions, LrcExporterProps, LrcExporterResult> {
  constructor(options?: LrcExporterOptions, global?: ConfigManager<CommonParserOptions>) {
    super(DEFAULT_EXPORTER_OPTIONS, global)
    if (options) {
      this.updatePluginOptions(options)
    }
  }

  override export(props: LyricInfo): LrcExporterResult {
    return null
  }
}
