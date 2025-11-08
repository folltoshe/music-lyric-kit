import type { Line, Producer } from '@root/lyric'
import type { CommonContext } from '@root/modules/parser/plugin'

import { MATCH_MODE } from '@root/utils'
import { DEFAULT_PRODUCER_RULES, DEFAULT_PRODUCER_RULES_QUICK_KEYWORDS } from './constants'

import { matchTextIsValid, matchTextWithPercentage, replaceFromText } from '@root/utils'

const MATCH_REGEXP = /(?:(?:\([^)]*\)|\[[^\]]*\]|\{[^}]*\}|（[^）]*）|【[^】]*】|「[^」]*」)|[^(:：()\[\]{}（）【】「」])*?[:：]/

const splitNameWithRule = (name: string, rule: string | RegExp) => {
  return name
    .split(rule)
    .map((item) => item.trim())
    .filter((item) => !!item)
}

export const processProducer = (context: CommonContext, infos: Line.Info[]): [Line.Info[], Producer[]] => {
  const options = context.common.config.get('meta.producer')
  if (!options.enable) {
    return [infos, []]
  }

  const result: Producer[] = []
  const lines: Line.Info[] = []

  const needReplace = options.replace
  const matchRules = [...(options.match.rule.useDefault ? DEFAULT_PRODUCER_RULES : []), ...options.match.rule.custom]
  for (const line of infos) {
    if (!line.content.original.trim()) {
      lines.push(line)
      continue
    }

    const colonCount = (line.content.original.match(/[:：]/g) || []).length
    if (!colonCount) {
      lines.push(line)
      continue
    }

    const match = MATCH_REGEXP.exec(line.content.original)
    if (!match) {
      lines.push(line)
      continue
    }

    const colonIndex = match.index + match[0].length - 1
    const role = line.content.original.substring(0, colonIndex).trim()
    const name = line.content.original.substring(colonIndex + 1).trim()

    if (!role || !name) {
      lines.push(line)
      continue
    }

    if (options.match.mode === MATCH_MODE.EXACT) {
      const percentage = matchTextWithPercentage(role, matchRules)
      if (percentage < options.match.exact.checkPercentage) {
        lines.push(line)
        continue
      }
    } else {
      const isMatch = matchTextIsValid(role, matchRules, DEFAULT_PRODUCER_RULES_QUICK_KEYWORDS)
      if (!isMatch) {
        lines.push(line)
        continue
      }
    }

    const item: Producer = {
      role: {
        raw: role,
        parsed: options.role.replace.enable ? replaceFromText(role, '', options.role.replace.rule).trim() : role,
      },
      name: {
        raw: name,
        parsed: splitNameWithRule(name, options.name.splitRule),
      },
    }
    result.push(item)

    if (!needReplace) {
      lines.push(line)
    }
  }

  return [lines, result]
}
