import type { LrcParserConfig, LrcParserParams, LrcParserResult } from '@music-lyric-kit/plugin-lrc'
import { LrcParser } from '@music-lyric-kit/plugin-lrc'

export type { LrcParserConfig, LrcParserParams, LrcParserResult }
export { LrcParser }

export interface LyricParserOptions {
  lrc?: LrcParserConfig
}

export class LyricParser {
  public lrc: LrcParser

  constructor(options?: LyricParserOptions) {
    this.lrc = new LrcParser(options?.lrc)
  }
}
