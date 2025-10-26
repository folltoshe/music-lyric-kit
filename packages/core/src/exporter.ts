import type { LrcExporterOptions, LrcExporterProps, LrcExporterResult } from '@music-lyric-kit/plugin-lrc'
import { LrcExporter } from '@music-lyric-kit/plugin-lrc'

export type { LrcExporterOptions, LrcExporterProps, LrcExporterResult }
export { LrcExporter }

export interface LyricExporterOptions {
  lrc?: LrcExporterOptions
}

export class LyricExporter {
  public lrc: LrcExporter

  constructor(options?: LyricExporterOptions) {
    this.lrc = new LrcExporter(options?.lrc)
  }
}
