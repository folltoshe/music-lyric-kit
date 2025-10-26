export * from './punctuation'
export * from './space'
export * from './match'
export * from './replace'

export const checkIsValidText = (content: any) => {
  return typeof content === 'string' && content.trim().length !== 0
}
