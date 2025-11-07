// @ts-check

/**
 * @param {string} content
 */
export const formatResult = (content) => {
  return content.replace(/(\n\s*){2,}/g, '\n\n').trim() + '\n'
}
