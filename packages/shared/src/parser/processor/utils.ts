export const buildQuickWords = (rules: RegExp[]) => {
  const src = rules.map((r) => r.source).join(' ')
  const raw = src.match(/[A-Za-z\u4e00-\u9fff]{2,}/g) || []

  const uniq = Array.from(new Set(raw.map((s) => s.toLowerCase())))
  uniq.sort((a, b) => b.length - a.length)

  return uniq
}
