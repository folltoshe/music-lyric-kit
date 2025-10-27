import type { LyricInfo, MusicInfoProps } from '@music-lyric-kit/shared'

export interface LrcParserParams {
  content: {
    original: string
    dynamic?: string
    translate?: string
    roman?: string
  }
  musicInfo?: MusicInfoProps
}

export type LrcParserResult = LyricInfo | null | undefined
