import type { Info, Line } from '@root/core/lyric'
import type { CommonContext } from '@root/core/parser/plugin'

import { Lyric } from '@root/core'

import { cloneDeep, crc32WithHex } from '@root/utils'

const MATCH_REGEXP = /(?:(?:\([^)]*\)|\[[^\]]*\]|\{[^}]*\}|（[^）]*）|【[^】]*】|「[^」]*」)|[^(:：()\[\]{}（）【】「」])*?[:：]/

const createGroupId = (name: string) => {
  const target = name.replaceAll(/\s/g, '').toLowerCase()
  return crc32WithHex(target).toUpperCase()
}

export const insertDuet = (context: CommonContext, info: Info) => {
  const options = context.common.config.get('content.duet')
  if (!options.enable) {
    return info
  }

  const lines: Line.Info[] = []
  const groups: Record<string, string> = {}

  let currentGroupName = ''
  let currentGroupId = ''

  const handleAdd = (line: Line.Info) => {
    if (!line.group) {
      line.group = cloneDeep(Lyric.EMPTY_GROUP_LINE_INFO)
    }
    line.group.id = currentGroupId
    lines.push(line)
  }

  const handleUpdateCurrent = () => {
    if (currentGroupId) {
      groups[currentGroupId] = currentGroupName
    }
  }

  for (const line of info.lines) {
    if (!line.content.original.trim()) {
      handleAdd(line)
      continue
    }

    const colonCount = (line.content.original.match(/[:：]/g) || []).length
    if (!colonCount) {
      handleAdd(line)
      continue
    }

    const match = MATCH_REGEXP.exec(line.content.original)
    if (!match) {
      handleAdd(line)
      continue
    }

    const colonIndex = match.index + match[0].length - 1
    const name = line.content.original.substring(0, colonIndex).trim()
    const content = line.content.original.substring(colonIndex + 1).trim()

    if (name) {
      // set last
      handleUpdateCurrent()
      // set new
      currentGroupName = name
      currentGroupId = createGroupId(name)
      if (!groups[currentGroupId]) {
        groups[currentGroupId] = currentGroupName
      }
      // need replace line
      if (!content && options.replace) {
        continue
      }
    }

    line.content.original = content.trim()

    handleAdd(line)
  }

  handleUpdateCurrent()

  const result = info
  result.groups = Object.entries(groups).map(([key, value]) => {
    return {
      id: key,
      name: value,
      total: 0,
    }
  })
  result.lines = lines

  return result
}
