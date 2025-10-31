export const buildQuickWords = (words: string[][]) => {
  const raw = words.flat()

  const uniq = Array.from(new Set(raw.map((s) => s.toLowerCase())))
  uniq.sort((a, b) => b.length - a.length)

  return uniq
}

export const buildRegexpFromWords = (words: string[][]) => {
  const result: RegExp[] = []

  for (const word of words) {
    const pattern = `(?:${word.join('|')})`
    const regexp = new RegExp(pattern, 'giu')
    result.push(regexp)
  }

  return result
}
