export interface TimeInfo {
  /** start time (ms) */
  start: number
  /** time duration (ms) */
  duration: number
  /** end time (ms) */
  end: number
}

export const EMPTY_TIME_INFO: TimeInfo = {
  start: 0,
  end: 0,
  duration: 0,
} as const
