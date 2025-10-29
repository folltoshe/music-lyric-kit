import type { Context as BaseContext, Exporter } from '@music-lyric-kit/shared'
import type { Config } from './config'

export type Context = BaseContext<Config, Exporter.Config.Full>
