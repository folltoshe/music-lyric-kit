export interface MatchItem {
  raw: string
  tag: string
  content: string
}

export interface MatchInfo {
  meta: MatchItem[]
  line: MatchItem[]
}
