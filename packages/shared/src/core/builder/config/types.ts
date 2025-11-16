import type { DeepPartial, DeepRequired } from '@root/utils'

export interface Full {}

export type FullPartial = DeepPartial<Full>

export type FullRequired = DeepRequired<Full>
