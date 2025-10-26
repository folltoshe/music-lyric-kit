import { buildQuickWords } from '../utils'

export const PURIFICATION_MATCH_MODE = {
  EXACT: 'EXACT',
  FUZZY: 'FUZZY',
} as const

export const DEFAULT_PURIFICATION_RULES: RegExp[] = [/(?:版权所有|License)/, /(?:翻唱|Cover)/, /(?:纯音乐)/]

export const DEFAULT_PURIFICATION_RULES_QUICK_KEYWORDS: string[] = buildQuickWords(DEFAULT_PURIFICATION_RULES)
