import type { Lyric, Parser } from '@music-lyric-kit/shared'

export interface Params {
  content: string
  musicInfo?: Parser.Plugin.MusicInfoProps
}

export type Result = null | undefined | Lyric.Info
