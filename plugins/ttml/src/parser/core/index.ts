import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config } from '@parser/config'
import type { Params, Result } from '@parser/core/types'

import { DEFAULT_CONFIG } from '@parser/config'

import { Parser } from '@music-lyric-kit/shared'

import { sortLines } from '@parser/utils'
import { matchLyric } from './match'
import { processGroup } from './group'
import { processAmllFormat } from './amll'

const { insertInterlude, insertSpaceToLines } = Parser.Processor

export class Plugin extends Parser.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Parser.Config.Full>) {
    super(DEFAULT_CONFIG, options, global)
  }

  override parse(params: Params): Result {
    const parsed = matchLyric(params.content)
    if (!parsed) {
      return null
    }

    const { head, body, isAmll } = parsed

    let target

    if (isAmll) {
      target = processAmllFormat(this.context, head, body)
    } else {
      throw new Error('not support format')
    }

    if (!target) {
      return null
    }

    const isSupportAutoScroll = !!target.lines.find((line) => line.time.start > 0)
    target.config.isSupportAutoScroll = isSupportAutoScroll

    // insert space
    target = insertSpaceToLines(this.context, target)

    // interlude
    target = insertInterlude(this.context, target)

    // group
    target = processGroup(this.context, target, head)

    const isInstrumental = target.lines.length <= 0
    target.config.isInstrumental = isInstrumental

    // sort lines
    target.lines = sortLines(target.lines)

    return target
  }
}

export type { Params, Result }
