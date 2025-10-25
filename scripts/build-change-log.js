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
const removeHead = (content) => {
  return content.replace(/^#.*?\n(?:(?:##|###).*?\n)*/s, '').trim()
}

const main = async () => {
  const command = 'conventional-changelog'
  const commandArgs = ['-p', 'angular']

  if (!args.current) {
    commandArgs.push(...['-i', CHANGE_LOG_FILE])
    commandArgs.push(...['-s'])
    await exec(command, commandArgs, {
      stdio: 'inherit',
      cwd: root,
    })
    return
  }

  commandArgs.push(...['-r', '2'])
  const result = await exec(command, commandArgs, {
    cwd: root,
  })
  if (!result.ok) {
    throw new Error('get change log failed!')
  }

  const trim = result.stdout?.trim()
  if (!trim) {
    throw new Error('get change log failed!')
  }

  const target = removeHead(trim)
  const output = join(root, CURRENT_CHANGE_LOG_FILE)

  writeFileSync(output, target, { encoding: 'utf-8' })
}

main()
