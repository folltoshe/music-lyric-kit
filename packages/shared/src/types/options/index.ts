import type { DeepRequired } from '../utils'

import type { CommonMatchOptions } from './match'
import type { CommonMetaOptions } from './meta'
import type { CommonInterludeOptions, CommonDuetOptions, CommonLineOptions } from './line'

export type { CommonMatchOptions }

export type { CommonMetaOptions }

export type { CommonInterludeOptions, CommonDuetOptions, CommonLineOptions }

export interface CommonOptions {
  meta?: CommonMetaOptions
  content?: {
    interlude?: CommonInterludeOptions
    duet?: CommonDuetOptions
    normal?: {
      original?: CommonLineOptions
      dynamic?: CommonLineOptions
    }
    extended?: {
      translate?: CommonLineOptions
      roman?: CommonLineOptions
      unknown?: CommonLineOptions
    }
  }
}

export type CommonOptionsRequired = DeepRequired<CommonOptions>
