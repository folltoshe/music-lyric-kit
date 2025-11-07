// @ts-check

import { exec } from 'node:child_process'

/**
 * @param {string} command
 * @returns {Promise<string>}
 */
export const runGitCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`)
      }
      if (stderr) {
        reject(`stderr: ${stderr}`)
      }
      resolve(stdout)
    })
  })
}

const COMMIT_MESSAGE_REGEXP = /^(feat|fix|chore|docs|style|refactor|perf|test|release)(\([a-zA-Z0-9-_]+\))?:\s(.*)$/

/**
 * @param {string} message
 * @returns {any | null}
 */
export const parseCommitMessage = (message) => {
  const match = message?.match(COMMIT_MESSAGE_REGEXP)
  if (!match) {
    return null
  }

  return {
    type: match[1],
    scope: match[2] ? match[2].slice(1, -1) : null,
    message: match[3],
  }
}

export const getRepoInfo = async () => {
  try {
    const remoteUrl = await runGitCommand('git remote get-url origin')
    if (!remoteUrl) {
      return null
    }

    const trimed = remoteUrl.trim()
    if (!trimed) {
      return null
    }

    const regex = /(?:github\.com[:/])(.+?)\/(.+?)(\.git)?$/
    const match = trimed.match(regex)

    if (match) {
      const owner = match[1]
      const name = match[2]
      return { owner, name }
    } else {
      throw new Error('Not a GitHub repository')
    }
  } catch (err) {
    console.error('Error getting repository info:', err)
    return null
  }
}

/**
 * @param {string} start
 * @param {string} end
 */
export const getCommitInfo = async (start, end = 'HEAD') => {
  try {
    const range = start || end ? `${start}..${end}` : ''
    const command = `git log ${range} --pretty=format:"%h|%H|%an|%ad|%s|%b" --date=short`
    const result = await runGitCommand(command)

    const commits = result
      .split('\n')
      .map((commit) => {
        const [shortHash, fullHash, author, date, subject, body] = commit.split('|')

        const result = parseCommitMessage(subject)
        if (!result) {
          return null
        }

        return {
          hash: {
            short: shortHash,
            full: fullHash,
          },
          author,
          date,
          subject,
          body,
          ...result,
        }
      })
      .filter((item) => !!item)

    return commits
  } catch (err) {
    console.error('Error getting commit info:', err)
    return []
  }
}

export const getLatestTag = async () => {
  try {
    const command = 'git describe --tags --abbrev=0'

    const tag = await runGitCommand(command)
    if (!tag) {
      return null
    }

    return tag.trim()
  } catch (err) {
    console.error('Error getting the latest tag:', err)
    return null
  }
}

export const getAllTags = async () => {
  try {
    const command = 'git tag'

    const result = await runGitCommand(command)
    if (!result) {
      return []
    }

    return result
      .split('\n')
      .filter((item) => !!item)
      .reverse()
  } catch (err) {
    console.error('Error getting tags:', err)
    return []
  }
}
