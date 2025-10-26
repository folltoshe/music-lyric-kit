import type { LyricInfo } from '@music-lyric-kit/shared'

export interface LrcParserProps {
  original: string
  dynamic?: string
  translate?: string
  roman?: string
}

export type LrcParserResult = LyricInfo | null | undefined
