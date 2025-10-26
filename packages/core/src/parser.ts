import type { LrcParserOptions, LrcParserProps, LrcParserResult } from '@music-lyric-kit/plugin-lrc'
import { LrcParser } from '@music-lyric-kit/plugin-lrc'

export type { LrcParserOptions, LrcParserProps, LrcParserResult }
export { LrcParser }

export interface LyricParserOptions {
  lrc?: LrcParserOptions
}

export class LyricParser {
  public lrc: LrcParser

  constructor(options?: LyricParserOptions) {
    this.lrc = new LrcParser(options?.lrc)
  }
}
