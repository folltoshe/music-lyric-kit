import type { DeepRequired } from '@root/utils'

import type { Match } from './match'
import type { Meta } from './meta'
import type { Line } from './line'
import type { Interlude, Duet, Purification } from './content'

export type { Match }
export type { Meta }
export type { Line }
export type { Interlude, Duet, Purification }

export interface Full {
  meta?: Meta
  content?: {
    purification?: Purification
    interlude?: Interlude
    duet?: Duet
  }
  line?: {
    normal?: {
      original?: Line
      dynamic?: Line
    }
    extended?: {
      translate?: Line
      roman?: Line
      unknown?: Line
    }
  }
}

export type FullRequired = DeepRequired<Full>
