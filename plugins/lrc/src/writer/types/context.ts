import type { Context as BaseContext, Writer } from '@music-lyric-kit/shared'
import type { Config } from './config'

export type Context = BaseContext<Config, Writer.Config.Full>
