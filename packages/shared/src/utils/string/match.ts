import { isRegExp } from '../regex'

const normalizeText = (content: string) => {
  const pre = String(content).trim()
  if (!pre.length) return null

  return pre
    .replaceAll(/[\u0000-\u001F\u007F]+/g, '')
    .replaceAll(/\s+/g, '')
    .trim()
    .toLowerCase()
}

/**
 * check if text matches a rule
 *
 * @param content text content
 * @param rules match rules
 * @param quick quick match words
 */
export const matchTextIsValid = (content: string, rules: (string | RegExp)[], quick: string[] = []) => {
  const normalize = normalizeText(content)
  if (!normalize) return false

  // check quic key word
  for (let i = 0; i < quick.length; i++) {
    const word = quick[i]
    if (word.length > normalize.length) continue
    if (normalize.indexOf(word) >= 0) return true
  }

  // check regex rule
  for (let i = 0; i < rules.length; i++) {
    try {
      const original = rules[i]
      const regex = isRegExp(original) ? (original.global ? new RegExp(original.source, 'iu') : original) : new RegExp(original, 'iu')
      if (regex.test(normalize)) return true
    } catch {
      continue
    }
  }

  return false
}

/**
 * rule match percentage in text
 *
 * @param content text content
 * @param rules match rules
 */
export const matchTextWithPercentage = (content: string, rules: (string | RegExp)[]) => {
  const normalize = normalizeText(content)
  if (!normalize) return false

  let percentage = 0
  let process = normalize

  for (let i = 0; i < rules.length; i++) {
    const original = rules[i]
    const regex = isRegExp(original) ? (original.global ? original : new RegExp(original.source, 'giu')) : new RegExp(original, 'giu')
    const matches = process.matchAll(regex)
    for (const match of matches) {
      const matchedStr = match[0]
      const matchPercentage = Math.floor((matchedStr.length / normalize.length) * 100)

      percentage = percentage + matchPercentage
      process = process.replace(matchedStr, '')

      if (percentage >= 100) {
        return 100
      }
    }
  }

  return Math.min(100, Math.floor(percentage))
}
