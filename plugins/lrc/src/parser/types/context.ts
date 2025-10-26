import type { Context as BaseContext, CommonParserOptions } from '@music-lyric-kit/shared'
import type { LrcParserOptions } from './options'

export type Context = BaseContext<LrcParserOptions, CommonParserOptions>
