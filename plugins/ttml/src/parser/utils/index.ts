import { type Lyric } from '@music-lyric-kit/shared'

export const sortLines = (lines: Lyric.Line.Info[]) => {
  return lines.sort((a, b) => a.time.start - b.time.start)
}

export * from './xml'
