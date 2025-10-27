import type { DeepRequired } from '@root/common'
import type { CommonMatchOptions } from './match'

export interface CommonParserMetaOptions {
  tag?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * people name
     */
    name?: {
      split?: {
        /**
         * @default "/"
         */
        rule?: string | RegExp
      }
    }
  }
  producer?: {
    /**
     * @default true
     */
    enable?: boolean
    /**
     * @default true
     */
    replace?: boolean
    /**
     * only when it is matched will it be used as the correct role
     */
    match?: CommonMatchOptions
    /**
     * role name options
     */
    role?: {
      replace?: {
        /**
         * @default true
         */
        enable?: boolean
        /**
         * @default "by"
         */
        rule?: (string | RegExp)[]
      }
    }
    /**
     * people name options
     */
    name?: {
      split?: {
        /**
         * @default "/"
         */
        rule?: string | RegExp
      }
    }
  }
}

export const COMMON_PARSER_META_OPTIONS: DeepRequired<CommonParserMetaOptions> = {
  tag: {
    enable: true,
    name: {
      split: {
        rule: '/',
      },
    },
  },
  producer: {
    enable: true,
    replace: true,
    match: {
      mode: 'FUZZY',
      exact: {
        check: {
          percentage: 60,
        },
      },
      fuzzy: {},
      rule: {
        useDefault: true,
        custom: [],
      },
    },
    role: {
      replace: {
        enable: true,
        rule: ['by'],
      },
    },
    name: {
      split: {
        rule: /(?:[/]|[,，])/iu,
      },
    },
  },
} as const
