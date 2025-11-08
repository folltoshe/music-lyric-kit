import type { Builder, Lyric, Context as BaseContext } from '@music-lyric-kit/shared'
import type { Config } from '@builder/config'

export type Context = BaseContext<Config, Builder.Config.Full>

export type Params = Lyric.Info

export type Result =
  | null
  | undefined
  | {
      original: string
      dynamic: string
      translate: string
      roman: string
    }
