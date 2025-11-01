import type { LrcBuilderConfig, LrcBuilderParams, LrcBuilderResult } from '@music-lyric-kit/plugin-lrc'
import { LrcBuilder } from '@music-lyric-kit/plugin-lrc'

export type { LrcBuilderConfig, LrcBuilderParams, LrcBuilderResult }
export { LrcBuilder }

export interface LyricBuilderOptions {
  lrc?: LrcBuilderConfig
}

export class LyricBuilder {
  public lrc: LrcBuilder

  constructor(options?: LyricBuilderOptions) {
    this.lrc = new LrcBuilder(options?.lrc)
  }
}
