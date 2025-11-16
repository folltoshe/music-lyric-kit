import type { Info, Line } from '@root/core/target'

export const insertGroupCount = (info: Info) => {
  const groups: Record<string, number> = {}

  const handleAdd = (line: Line.Info) => {
    if (!line.group) {
      return
    }
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
    if (!line.group || !line.group.id) {
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
