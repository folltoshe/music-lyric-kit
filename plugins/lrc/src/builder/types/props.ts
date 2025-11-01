import type { Lyric } from '@music-lyric-kit/shared'

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
