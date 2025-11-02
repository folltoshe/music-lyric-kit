import { LrcPlugin } from '@root/plugins'

export interface LyricBuilderOptions {
  lrc?: LrcPlugin.Builder.Config
}

export class LyricBuilder {
  public lrc: LrcPlugin.Builder.Plugin

  constructor(options?: LyricBuilderOptions) {
    this.lrc = new LrcPlugin.Builder.Plugin(options?.lrc)
  }
}
