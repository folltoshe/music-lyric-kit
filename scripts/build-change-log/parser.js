// @ts-check

const ALLOW_TYPES = ['feat', 'fix', 'revert', 'docs', 'refactor']

const TYPE_TITLE_MAP = {
  feat: 'Feature',
  docs: 'Document',
  fix: 'Bug Fix',
  revert: 'Revert Chnage',
  refactor: 'Code Refactor',
  breaking: 'Breaking Change',
}

const BREAKING_CHANGE_REGEXP = /^breaking change:\s*(.*)/i

/**
 * @param {string} text
 */
const extractBreakingChangeInfo = (text) => {
  if (!text) {
    return null
  }

  const trimed = text.trim()
  if (!trimed) {
    return null
  }

  const match = trimed.match(BREAKING_CHANGE_REGEXP)
  if (match) {
    return match[1]
  }

  return null
}

/**
 * @param {*} info
 */
export const buildHeader = (info) => {
  const { date, message } = info

  return `## ${message} (${date})`
}

/**
 * @param {string} type
 */
const buildTypeHeader = (type) => {
  // @ts-expect-error
  const title = TYPE_TITLE_MAP[type]
  return `### ${title}`
}

/**
 *
 * @param {string} scope
 */
const buildScopeHeader = (scope) => {
  return `- ${scope}`
}

/**
 *
 * @param {any} commit
 * @param {any} repo
 * @param {boolean} inScope
 */
const buildBody = (commit, repo, inScope = false) => {
  const { hash, message } = commit

  return `${inScope ? '  ' : ''}- ${message} ([${hash.short}](https://github.com/${repo.owner}/${repo.name}/commit/${hash.short}))`
}

/**
 * @param {string[]} changes
 */
const buildBreakingChange = (changes) => {
  if (!changes || !changes.length) {
    return null
  }

  const result = []

  const header = buildTypeHeader('breaking')
  result.push('\n')
  result.push(header)
  result.push('\n')

  for (const change of changes) {
    result.push(`- ${change}`)
  }

  return result
}

/**
 * @param {*[]} infos
 * @param {*} repo
 */
export const buildContents = (infos, repo) => {
  /** @type any */
  const target = {}

  for (const info of infos) {
    const type = info.type

    if (!type || !ALLOW_TYPES.includes(type)) {
      continue
    }

    if (!target[type]) {
      target[type] = []
    }

    const scope = info.scope ?? 'common'
    if (!target[type][scope]) {
      target[type][scope] = []
    }

    target[type][scope].push(info)
  }

  /** @type string[] */
  const result = []
  /** @type string[] */
  const breaking = []

  /**
   * @param {any[]} commits
   * @param {boolean} inScope
   */
  const processCommits = (commits, inScope = false) => {
    for (const commit of commits) {
      const body = buildBody(commit, repo, inScope)
      result.push(body)
      const breakingChange = extractBreakingChangeInfo(commit.body)
      if (breakingChange) {
        breaking.push(breakingChange)
      }
    }
  }

  const types = Object.keys(target).sort()
  for (const type of types) {
    result.push('\n')
    result.push(buildTypeHeader(type))
    result.push('\n')

    const scopes = target[type]

    const common = scopes['common']
    delete scopes['common']

    const sorted = Object.keys(scopes).sort()
    for (const scope of sorted) {
      const header = buildScopeHeader(scope)
      result.push(header)
      const commits = scopes[scope]
      processCommits(commits, true)
    }

    // common commits
    processCommits(common || [], false)
  }

  if (breaking) {
    const changes = buildBreakingChange(breaking)
    if (changes && changes.length) {
      result.unshift(...changes)
    }
  }

  return result
}
