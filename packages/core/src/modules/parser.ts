import { LrcPlugin } from '@root/plugins'

export interface LyricParserOptions {
  lrc?: LrcPlugin.Parser.Config
}

export class LyricParser {
  public lrc: LrcPlugin.Parser.Plugin

  constructor(options?: LyricParserOptions) {
    this.lrc = new LrcPlugin.Parser.Plugin(options?.lrc)
  }
}
