// @ts-check

import { writeFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import { join } from 'node:path'

import { root, exec } from './utils.js'

const CHANGE_LOG_FILE = 'CHANGELOG.md'
const CURRENT_CHANGE_LOG_FILE = 'CURRENT_CHANGELOG.md'

const { values: args } = parseArgs({
  allowPositionals: true,
  options: {
    current: {
      type: 'boolean',
      default: false,
    },
  },
})

/**
 * @param {string} content
 */
const replaceBreakingChangesHead = (content) => {
  return content.replaceAll('BREAKING CHANGES', 'Breaking Changes').replaceAll('⚠ ', '')
}

/**
 * @param {string} content
 */
const removeHead = (content) => {
  return content.replace(/^#.*?\n(?:(?:##|###).*?\n)*/s, '').trim()
}

const main = async () => {
  const command = 'conventional-changelog'
  const commandArgs = ['-p', 'angular']

  if (args.current) {
    commandArgs.push(...['-r', '2'])
  } else {
    commandArgs.push(...['-r', '0'])
  }

  const result = await exec(command, commandArgs, {
    cwd: root,
  })
  if (!result.ok) {
    throw new Error('get change log failed!')
  }

  const trim = String(result.stdout || '').trim()
  if (!trim) {
    throw new Error('get change log failed!')
  }

  let target = replaceBreakingChangesHead(trim)
  if (args.current) {
    target = removeHead(target)
  }
  target = target + '\n'

  const name = args.current ? CURRENT_CHANGE_LOG_FILE : CHANGE_LOG_FILE
  const output = join(root, name)

  writeFileSync(output, target, { encoding: 'utf-8' })
}

main()
