import type { LyricInfo, Line } from '@root/lyric'
import type { CommonPurificationOptions } from '@root/options'
import type { DeepRequired } from '@root/utils'
import type { ContextCommon, MusicInfoProps } from '@root/plugin'

import { MATCH_MODE } from '@root/utils'
import { DEFAULT_PURIFICATION_RULES, DEFAULT_PURIFICATION_RULES_QUICK_KEYWORDS } from '../constants'

import { matchTextIsValid, matchTextWithPercentage } from '@root/utils'

const handleProcessName = (content: string) => {
  return content.replaceAll(/\s/g, '').trim().toLowerCase()
}

const handleProcessMusicInfoRules = (musicInfo: MusicInfoProps) => {
  return [handleProcessName(musicInfo.name), ...musicInfo.singer.map((item) => handleProcessName(item))]
}

const handleCheck = (
  options: DeepRequired<CommonPurificationOptions>,
  rules: (string | RegExp)[],
  index: number,
  content: string,
  musicInfo?: MusicInfoProps
) => {
  if (!content.trim()) {
    return false
  }

  const isFirstLine = index === 0

  const firstLineRules = isFirstLine
    ? [
        ...(musicInfo && options.firstLine.useMusicInfo ? handleProcessMusicInfoRules(musicInfo) : []),
        ...options.firstLine.rule.custom,
        ...(options.firstLine.rule.useDefault ? rules : []),
      ]
    : []
  const targetRules = isFirstLine ? [...rules, ...firstLineRules] : rules

  const mode = isFirstLine ? options.firstLine.mode : options.match.mode
  const exact = isFirstLine ? options.firstLine.exact : options.match.exact

  if (mode === MATCH_MODE.EXACT) {
    const percentage = matchTextWithPercentage(content, targetRules)
    const check = exact.check.percentage
    if (percentage > check) {
      return true
    }
  } else {
    const isMatch = matchTextIsValid(content, targetRules, DEFAULT_PURIFICATION_RULES_QUICK_KEYWORDS)
    if (isMatch) {
      return true
    }
  }

  return false
}

export const purificationLyric = (context: ContextCommon, info: LyricInfo, musicInfo?: MusicInfoProps) => {
  const options = context.options.common.get('content.purification')
  if (!options.enable) {
    return info
  }

  const result = info
  const lines: Line.Info[] = []

  const matchRules = [...(options.match.rule.useDefault ? DEFAULT_PURIFICATION_RULES : []), ...options.match.rule.custom]
  for (let index = 0; index < info.lines.length; index++) {
    const line = info.lines[index]
    const content = line.content.original

    const check = handleCheck(options, matchRules, index, content, musicInfo)
    if (!check) {
      lines.push(line)
    }
  }

  result.lines = lines
  return result
}
