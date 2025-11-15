import { buildQuickWords, buildRegexpFromWords } from '../utils'

const RULES: string[][] = [['版权所有', '版权', 'License'], ['翻唱', 'Cover'], ['纯音乐']]

export const DEFAULT_PURIFICATION_RULES: RegExp[] = buildRegexpFromWords(RULES)

export const DEFAULT_PURIFICATION_RULES_QUICK_KEYWORDS: string[] = buildQuickWords(RULES)
