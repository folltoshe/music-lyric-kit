import type { CommonOptionsRequired } from '../options'
import type { OptionsManager } from '@root/utils'

export interface MusicInfoProps {
  name: string
  singer: string[]
}

export interface Context<T extends Record<string, any>> {
  options: {
    common: OptionsManager<CommonOptionsRequired>
    plugin: OptionsManager<T>
  }
}

export type ContextCommon = Context<any>
