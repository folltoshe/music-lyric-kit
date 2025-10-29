import type { LrcExporterConfig, LrcExporterParams, LrcExporterResult } from '@music-lyric-kit/plugin-lrc'
import { LrcExporter } from '@music-lyric-kit/plugin-lrc'

export type { LrcExporterConfig, LrcExporterParams, LrcExporterResult }
export { LrcExporter }

export interface LyricExporterOptions {
  lrc?: LrcExporterConfig
}

export class LyricExporter {
  public lrc: LrcExporter

  constructor(options?: LyricExporterOptions) {
    this.lrc = new LrcExporter(options?.lrc)
  }
}
