import type { DeepRequired } from '@root/common'

import type { CommonParserMetaOptions } from './meta'
import type { CommonParserPurificationOptions, CommonParserInterludeOptions, CommonParserDuetOptions, CommonParserLineOptions } from './line'

import { COMMON_PARSER_META_OPTIONS } from './meta'
import { COMMON_PARSER_INTERLUDE_OPTIONS, COMMON_PARSER_DUET_OPTIONS, COMMON_PARSER_PURIFICATION_OPTIONS, COMMON_PARSER_LINE_OPTIONS } from './line'

export interface CommonParserOptions {
  meta?: CommonParserMetaOptions
  content?: {
    purification?: CommonParserPurificationOptions
    interlude?: CommonParserInterludeOptions
    duet?: CommonParserDuetOptions
    normal?: {
      original?: CommonParserLineOptions
      dynamic?: CommonParserLineOptions
    }
    extended?: {
      translate?: CommonParserLineOptions
      roman?: CommonParserLineOptions
      unknown?: CommonParserLineOptions
    }
  }
}

export type CommonParserOptionsRequired = DeepRequired<CommonParserOptions>

export type { CommonParserMetaOptions }
export type { CommonParserPurificationOptions, CommonParserInterludeOptions, CommonParserDuetOptions, CommonParserLineOptions }

export const COMMON_PARSER_OPTIONS: CommonParserOptionsRequired = {
  meta: COMMON_PARSER_META_OPTIONS,
  content: {
    interlude: COMMON_PARSER_INTERLUDE_OPTIONS,
    duet: COMMON_PARSER_DUET_OPTIONS,
    purification: COMMON_PARSER_PURIFICATION_OPTIONS,
    normal: {
      original: COMMON_PARSER_LINE_OPTIONS,
      dynamic: COMMON_PARSER_LINE_OPTIONS,
    },
    extended: {
      translate: COMMON_PARSER_LINE_OPTIONS,
      roman: COMMON_PARSER_LINE_OPTIONS,
      unknown: COMMON_PARSER_LINE_OPTIONS,
    },
  },
} as const

export { COMMON_PARSER_META_OPTIONS }
export { COMMON_PARSER_INTERLUDE_OPTIONS, COMMON_PARSER_DUET_OPTIONS, COMMON_PARSER_PURIFICATION_OPTIONS, COMMON_PARSER_LINE_OPTIONS }
