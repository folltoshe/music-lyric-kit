const buildQuickWords = (words: string[][]) => {
  const raw = words.flat()

  const uniq = Array.from(new Set(raw.map((s) => s.toLowerCase())))
  uniq.sort((a, b) => b.length - a.length)

  return uniq
}

const buildRegexpFromWords = (words: string[][]) => {
  const result: RegExp[] = []

  for (const word of words) {
    const pattern = `(?:${word.join('|')})`
    const regexp = new RegExp(pattern, 'giu')
    result.push(regexp)
  }

  return result
}

const RULES: string[][] = [['版权所有', '版权', 'License'], ['翻唱', 'Cover'], ['纯音乐']]

export const DEFAULT_PURIFICATION_RULES: RegExp[] = buildRegexpFromWords(RULES)

export const DEFAULT_PURIFICATION_RULES_QUICK_KEYWORDS: string[] = buildQuickWords(RULES)
