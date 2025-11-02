import { LrcPlugin } from '@root/plugins'
import { TtmlPlugin } from '@root/plugins'

export interface LyricParserOptions {
  lrc?: LrcPlugin.Parser.Config
  ttml?: TtmlPlugin.Parser.Config
}

export class LyricParser {
  public lrc: LrcPlugin.Parser.Plugin
  public ttml: TtmlPlugin.Parser.Plugin

  constructor(options?: LyricParserOptions) {
    this.lrc = new LrcPlugin.Parser.Plugin(options?.lrc)
    this.ttml = new TtmlPlugin.Parser.Plugin(options?.ttml)
  }
}
