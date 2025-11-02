import type { Info, Line } from '@root/modules/lyric'
import type { CommonContext } from '@root/modules/parser/plugin'

export const insertGroupCount = (context: CommonContext, info: Info) => {
  const groups: Record<string, number> = {}

  const handleAdd = (line: Line.Info) => {
    line.group.index = {
      global: currentGroupGlobalIndex,
      block: currentGroupBlockIndex,
    }
    currentGroupGlobalIndex++
    currentGroupBlockIndex++
  }

  const handleUpdateCurrent = () => {
    if (currentGroupId) {
      groups[currentGroupId] = currentGroupGlobalIndex
    }
  }

  let currentGroupId = ''
  let currentGroupGlobalIndex = 0
  let currentGroupBlockIndex = 0
  for (const line of info.lines) {
    if (!line.group.id) {
      continue
    }

    if (line.group.id !== currentGroupId) {
      handleUpdateCurrent()
      currentGroupId = line.group.id
      currentGroupBlockIndex = 0
      currentGroupGlobalIndex = groups[currentGroupId] || 0
    }

    handleAdd(line)
  }

  info.groups = info.groups.map((item) => {
    return {
      ...item,
      total: groups[item.id] || 0,
    }
  })

  return info
}
