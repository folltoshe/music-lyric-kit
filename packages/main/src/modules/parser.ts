import type { DeepPartial } from '@music-lyric-kit/shared'

import { ConfigManager, Parser } from '@music-lyric-kit/shared'

import { LrcPlugin, TtmlPlugin } from '@root/plugins'

export interface LyricParserOptions {
  common?: Parser.Config.Full
  plugin?: {
    lrc?: LrcPlugin.Parser.Config
    ttml?: TtmlPlugin.Parser.Config
  }
}

export class LyricParser {
  private common?: ConfigManager<Parser.Config.Full>

  public lrc: LrcPlugin.Parser.Plugin
  public ttml: TtmlPlugin.Parser.Plugin

  constructor(options?: LyricParserOptions) {
    if (options?.common) {
      this.common = new ConfigManager({
        current: {
          default: Parser.Config.FULL,
          init: options.common,
        },
      })
    }
    this.lrc = new LrcPlugin.Parser.Plugin(options?.plugin?.lrc, this.common)
    this.ttml = new TtmlPlugin.Parser.Plugin(options?.plugin?.ttml, this.common)
  }

  public updateCommonConfig(target: DeepPartial<Parser.Config.Full>) {
    if (!this.common) {
      return
    }
    this.common.set(target)
  }
}
