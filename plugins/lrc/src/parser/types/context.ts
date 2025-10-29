import type { Context as BaseContext, Parser } from '@music-lyric-kit/shared'
import type { Config } from './config'

export type Context = BaseContext<Config, Parser.Config.Full>
