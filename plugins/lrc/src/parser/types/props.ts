import type { Lyric, Parser } from '@music-lyric-kit/shared'

export interface Params {
  content: {
    original: string
    dynamic?: string
    translate?: string
    roman?: string
  }
  musicInfo?: Parser.Plugin.MusicInfoProps
}

export type Result = null | undefined | Lyric.Info
