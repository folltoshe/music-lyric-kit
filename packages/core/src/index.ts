import type { LrcOptions, LrcParseProps } from '@music-lyric-kit/plugin-lrc'
import { LrcParser } from '@music-lyric-kit/plugin-lrc'

export type { LrcOptions, LrcParseProps }
export { LrcParser }

export interface LyricParserOptions {
  lrc?: LrcOptions
}

export class LyricParser {
  public lrc: LrcParser

  constructor(options?: LyricParserOptions) {
    this.lrc = new LrcParser(options?.lrc)
  }
}
