import type { Context as BaseContext, Builder } from '@music-lyric-kit/shared'
import type { Config } from './config'

export type Context = BaseContext<Config, Builder.Config.Full>
