import type { DeepPartial, DeepRequired } from '@music-lyric-kit/shared'

export interface Config {
  meta: {
    tag: {
      /**
       * @default true
       */
      enable: boolean
      /**
       * people name
       */
      name: {
        /**
         * @default "/"
         */
        splitRule: string | RegExp
      }
    }
    producer: {
      /**
       * @default true
       */
      enable: boolean
      /**
       * @default true
       */
      replace: boolean
      /**
       * only when it is matched will it be used as the correct role
       */
      match: any
      /**
       * role name options
       */
      role: {
        replace: {
          /**
           * @default true
           */
          enable: boolean
          /**
           * @default "by"
           */
          rule: (string | RegExp)[]
        }
      }
      /**
       * people name options
       */
      name: {
        /**
         * @default "/"
         */
        splitRule: string | RegExp
      }
    }
  }
}

export type ConfigPartial = DeepPartial<Config>

export type ConfigRequired = DeepRequired<Config>
