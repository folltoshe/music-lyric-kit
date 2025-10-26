import type { LyricInfo, Line } from '@root/lyric'
import type { ContextCommon } from '@root/plugin'

import { crc32WithHex } from '@root/utils'

const MATCH_REGEXP = /(?:(?:\([^)]*\)|\[[^\]]*\]|\{[^}]*\}|（[^）]*）|【[^】]*】|「[^」]*」)|[^(:：()\[\]{}（）【】「」])*?[:：]/

const createGroupId = (name: string) => {
  const target = name.replaceAll(/\s/g, '').toLowerCase()
  return crc32WithHex(target).toUpperCase()
}

export const insertDuet = (context: ContextCommon, info: LyricInfo) => {
  const options = context.options.common.get('content.duet')
  if (!options.enable) {
    return info
  }

  const lines: Line.Info[] = []
  const groups: Record<string, [string, number]> = {}

  let currentGroupName = ''
  let currentGroupId = ''
  let currentGroupGlobalIndex = 0
  let currentGroupBlockIndex = 0

  const handleAdd = (line: Line.Info) => {
    line.group = {
      id: currentGroupId,
      index: {
        global: currentGroupGlobalIndex,
        block: currentGroupBlockIndex,
      },
    }
    lines.push(line)
    currentGroupGlobalIndex++
    currentGroupBlockIndex++
  }

  const handleUpdateCurrent = () => {
    if (currentGroupId) {
      groups[currentGroupId] = [currentGroupName, currentGroupGlobalIndex]
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
      currentGroupBlockIndex = 0
      if (!groups[currentGroupId]) {
        currentGroupGlobalIndex = 0
        groups[currentGroupId] = [currentGroupName, currentGroupGlobalIndex]
      } else {
        const [_, count] = groups[currentGroupId]
        currentGroupGlobalIndex = count
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
      name: value[0],
      total: value[1],
    }
  })
  result.lines = lines

  return result
}
