export interface Clause {
  id: string
  bookTitle: string
  chapterCode: string
  chapterTitle: string
  sectionCode: string
  sectionTitle: string
  clauseCode: string
  pageStart: number | null
  pageEnd: number | null
  originalText: string
  cleanText: string
  summary: string
  keywords: string[]
  tags: string[]
  embeddingText: string
}

export interface RawClause {
  [key: string]: unknown
}