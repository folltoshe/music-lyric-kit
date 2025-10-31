import type { LrcWriterConfig, LrcWriterParams, LrcWriterResult } from '@music-lyric-kit/plugin-lrc'
import { LrcWriter } from '@music-lyric-kit/plugin-lrc'

export type { LrcWriterConfig, LrcWriterParams, LrcWriterResult }
export { LrcWriter }

export interface LyricWriterOptions {
  lrc?: LrcWriterConfig
}

export class LyricWriter {
  public lrc: LrcWriter

  constructor(options?: LyricWriterOptions) {
    this.lrc = new LrcWriter(options?.lrc)
  }
}
