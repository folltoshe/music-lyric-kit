import type { Context as BaseContext, CommonExporterOptions } from '@music-lyric-kit/shared'
import type { LrcExporterOptions } from './options'

export type Context = BaseContext<LrcExporterOptions, CommonExporterOptions>
