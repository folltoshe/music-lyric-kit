import type { DeepPartial } from '@music-lyric-kit/shared'

import { ConfigManager, Builder } from '@music-lyric-kit/shared'

import { LrcPlugin } from '@root/plugins'

export interface LyricBuilderOptions {
  common?: Builder.Config.Full
  plugin?: {
    lrc?: LrcPlugin.Builder.Config
  }
}

export class LyricBuilder {
  private common?: ConfigManager<Builder.Config.Full>

  public lrc: LrcPlugin.Builder.Plugin

  constructor(options?: LyricBuilderOptions) {
    if (options?.common) {
      this.common = new ConfigManager({
        current: {
          default: Builder.Config.FULL,
          init: options.common,
        },
      })
    }
    this.lrc = new LrcPlugin.Builder.Plugin(options?.plugin?.lrc)
  }

  public updateCommonConfig(target: DeepPartial<Builder.Config.Full>) {
    if (!this.common) {
      return
    }
    this.common.set(target)
  }
}
