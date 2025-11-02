import type { ConfigManager } from '@music-lyric-kit/shared'
import type { Config, Params, Result } from '@root/parser/types'

import { DEFAULT_CONFIG } from '@root/parser/constants'

import { Parser } from '@music-lyric-kit/shared'

import { sortLines } from '@root/parser/utils'
import { matchLyric } from './match'
import { processGroup } from './group'
import { processAmllFormat } from './amll'

const { insertInterlude } = Parser.Processor

export class Plugin extends Parser.Plugin.Base<Config, Params, Result> {
  constructor(options?: Config, global?: ConfigManager<Parser.Config.Full>) {
    super(DEFAULT_CONFIG, global)
    if (options) {
      this.updatePluginOptions(options)
    }
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

    const isInstrumental = target.lines.length <= 0
    target.config.isInstrumental = isInstrumental

    // interlude
    target = insertInterlude(this.context, target)

    // group
    target = processGroup(this.context, target, head)

    // sort lines
    target.lines = sortLines(target.lines)

    return target
  }
}
