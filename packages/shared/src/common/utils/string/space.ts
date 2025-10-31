import type { ValueOf } from '../../types'

export const INSERT_TEXT_SPACE_TYPES = {
  ALL: 'ALL',
  PUNCTUATION: 'PUNCTUATION',
  BRACKET: 'BRACKET',
  QUOTE: 'QUOTE',
  OPERATOR: 'OPERATOR',
  CJK_WITH_ENGLISH_NUMBER: 'CJK_WITH_ENGLISH_NUMBER',
  HYPHEN_SLASH: 'HYPHEN_SLASH',
} as const

export type InsertTextSpaceTypes = ValueOf<typeof INSERT_TEXT_SPACE_TYPES>

const INSERT_TEXT_SPACE_TYPES_VALUE = Object.values(INSERT_TEXT_SPACE_TYPES) as InsertTextSpaceTypes[]

// rules

const CJK_RANGE = '\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff' as const

const ENGLISH_RANGE = 'A-Za-z' as const
const NUMBER_RANGE = '0-9' as const
const SYMBOL_RANGE = '!@#$%^&+\\-=/|<>' as const
const ENGLISH_NUMBER_RANGE = `${ENGLISH_RANGE}${NUMBER_RANGE}` as const
const ALL_RANGE = `${ENGLISH_NUMBER_RANGE}${SYMBOL_RANGE}${CJK_RANGE}` as const

const ABBREVIATIONS = [/I'[dmsv]/gi, /(?:[A-Za-z]')['a-z]*/g] as const

const MULTIPLE_SPACE_RULE = /[ ]{2,}/g
const TRIM_INSIDE_SYMBOLS_RULE = new RegExp(`([<\\[\\{\\("“‘'])\\s*([^<>\\[\\]\\{\\}\\("“‘']*?)\\s*([>\\]\\}\\)"”’'])`, 'gu')
const HAS_CJK = new RegExp(`[${CJK_RANGE}]`, 'u')

const HYPHEN_RULE = new RegExp(`([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])(-)([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])`, 'gu')
const SLASH_RULE = new RegExp(`([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])(/)([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])`, 'gu')
const HYPHEN_EDGE_RULE = new RegExp(`(\\s|^)(-)(?=[${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])|([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])(-)(?=\\s|$)`, 'gu')

const CJK_WITH_EN_RULE = new RegExp(`([${CJK_RANGE}])([${ENGLISH_NUMBER_RANGE}])`, 'gu')
const EN_WITH_CJK_RULE = new RegExp(`([${ENGLISH_NUMBER_RANGE}])([${CJK_RANGE}])`, 'gu')

const QUOTE_BEFORE_RULE = new RegExp(`([${CJK_RANGE}${ENGLISH_NUMBER_RANGE}])(["'\`])`, 'gu')
const QUOTE_AFTER_RULE = new RegExp(`(["'\`])([${CJK_RANGE}${ENGLISH_NUMBER_RANGE}])`, 'gu')

const PUNCTUATION_RULE = new RegExp(`([${ALL_RANGE}])([!;,\\?:])(?=[${ALL_RANGE}])`, 'gu')
const OPERATOR_RULE = new RegExp(`([${ALL_RANGE}])([+\\-*/=&])([${ALL_RANGE}])`, 'gu')
const BRACKET_OUTSIDE_BEFORE_RULE = new RegExp(`([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])([\\[({<])`, 'gu')
const BRACKET_OUTSIDE_AFTER_RULE = new RegExp(`([\\])}>])([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])`, 'gu')
const BRACKET_INSIDE_OPERATOR_RULE = new RegExp(`([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])([+\\-*/=&])([${ENGLISH_NUMBER_RANGE}${CJK_RANGE}])`, 'gu')

const trimInsideSymbols = (text: string): string => {
  return text.replace(TRIM_INSIDE_SYMBOLS_RULE, (_, left, inner, right) => left + inner.trim() + right)
}

const processBracketContent = (content: string): string => {
  if (!content) return content
  return content.replace(BRACKET_INSIDE_OPERATOR_RULE, '$1 $2 $3').replace(HYPHEN_RULE, '$1 $2 $3').replace(SLASH_RULE, '$1 $2 $3')
}

const protectAbbreviations = (text: string): [string, Map<string, string>] => {
  const protectedMap = new Map<string, string>()
  let protectedText = text
  let counter = 0

  for (const pattern of ABBREVIATIONS) {
    protectedText = protectedText.replace(pattern, (match) => {
      const placeholder = `__ABBR_${counter++}__`
      protectedMap.set(placeholder, match)
      return placeholder
    })
  }

  return [protectedText, protectedMap]
}

const restoreAbbreviations = (text: string, protectedMap: Map<string, string>): string => {
  for (const [key, value] of protectedMap.entries()) {
    text = text.replace(new RegExp(key, 'g'), value)
  }
  return text
}

const applyPunctuationRules = (text: string) => {
  return text.replace(PUNCTUATION_RULE, '$1$2 ')
}

const applyQuoteRules = (text: string) => {
  return text.replace(QUOTE_BEFORE_RULE, '$1 $2').replace(QUOTE_AFTER_RULE, '$1 $2')
}

const applyBracketRules = (text: string) => {
  let result = text

  result = result.replace(BRACKET_OUTSIDE_BEFORE_RULE, '$1 $2')
  result = result.replace(BRACKET_OUTSIDE_AFTER_RULE, '$1 $2')
  result = result.replace(TRIM_INSIDE_SYMBOLS_RULE, (_, l, inner, r) => l + processBracketContent(inner.trim()) + r)

  return result
}

const applyOperatorRules = (text: string) => {
  return text.replace(OPERATOR_RULE, '$1 $2 $3')
}

const applyHyphenSlashRules = (text: string) => {
  let result = text.replace(HYPHEN_RULE, '$1 $2 $3').replace(SLASH_RULE, '$1 $2 $3')
  return result.replace(HYPHEN_EDGE_RULE, (m, s1, h1, c1, c2, h2, s2) => {
    if (s1 !== undefined) return `${s1}${h1} ${c1 ?? ''}`
    if (s2 !== undefined) return `${c2 ?? ''} ${h2}${s2}`
    return m
  })
}

const applyCjkWithEnglishNumber = (text: string) => {
  return text.replace(CJK_WITH_EN_RULE, '$1 $2').replace(EN_WITH_CJK_RULE, '$1 $2')
}

const applyMultipleSpace = (text: string) => {
  return text.replace(MULTIPLE_SPACE_RULE, ' ')
}

const handleProcessTypes = (types?: InsertTextSpaceTypes[]) => {
  const target = types || [INSERT_TEXT_SPACE_TYPES.ALL]
  return new Set<InsertTextSpaceTypes>(target.includes(INSERT_TEXT_SPACE_TYPES.ALL) ? INSERT_TEXT_SPACE_TYPES_VALUE : target)
}

export const insertSpace = (text: string, types?: InsertTextSpaceTypes[]) => {
  if (typeof text !== 'string' || text.trim().length === 0) return text

  const processTypes = handleProcessTypes(types)

  const [protectedText, abbreviationMap] = protectAbbreviations(text)

  let result = protectedText

  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.BRACKET)) {
    result = applyBracketRules(result)
  }
  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.QUOTE)) {
    result = applyQuoteRules(result)
  }
  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.PUNCTUATION)) {
    result = applyPunctuationRules(result)
  }
  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.OPERATOR)) {
    result = applyOperatorRules(result)
  }
  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.HYPHEN_SLASH)) {
    result = applyHyphenSlashRules(result)
  }
  if (processTypes.has(INSERT_TEXT_SPACE_TYPES.CJK_WITH_ENGLISH_NUMBER)) {
    result = applyCjkWithEnglishNumber(result)
  }

  result = trimInsideSymbols(result)
  result = applyMultipleSpace(result)
  result = restoreAbbreviations(result, abbreviationMap)

  return result.trim()
}

export const insertSpaceBatch = (list: string[], types?: InsertTextSpaceTypes[]) => {
  return list.length ? list.map((item) => insertSpace(item, types)) : list
}
