import type { Lyric, Parser, Context as BaseContext } from '@music-lyric-kit/shared'
import type { Config } from '@parser/config'

export type Context = BaseContext<Config, Parser.Config.Full>

export interface Params {
  content: string
  musicInfo?: Parser.Plugin.MusicInfoProps
}

export type Result = null | undefined | Lyric.Info
