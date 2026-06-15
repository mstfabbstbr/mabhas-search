import { Clause, RawClause } from "@/types/clause"
import { normalizePersian, tokenize } from "./normalize"

function readString(raw: RawClause, keys: string[], fallback = ""): string {
  for (const key of keys) {
    const value = raw[key]
    if (typeof value === "string") return value
  }
  return fallback
}

function readNumber(raw: RawClause, keys: string[]): number | null {
  for (const key of keys) {
    const value = raw[key]
    if (typeof value === "number") return value
    if (typeof value === "string" && !Number.isNaN(Number(value))) {
      return Number(value)
    }
  }
  return null
}

function readStringArray(raw: RawClause, keys: string[]): string[] {
  for (const key of keys) {
    const value = raw[key]

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string")
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

  return []
}

export function mapRawClause(raw: RawClause): Clause {
  const originalText = readString(raw, ["originalText", "original_text"])
  const cleanText = readString(raw, ["cleanText", "clean_text"], originalText)
  const summary = readString(raw, ["summary"], "")
  const keywords = readStringArray(raw, ["keywords"])
  const tags = readStringArray(raw, ["tags"])

  return {
    id: readString(raw, ["id"]),
    bookTitle: readString(raw, ["bookTitle", "book_title"]),
    chapterCode: readString(raw, ["chapterCode", "chapter_code"]),
    chapterTitle: readString(raw, ["chapterTitle", "chapter_title"]),
    sectionCode: readString(raw, ["sectionCode", "section_code"]),
    sectionTitle: readString(raw, ["sectionTitle", "section_title"]),
    clauseCode: readString(raw, ["clauseCode", "clause_code", "code"]),
    pageStart: readNumber(raw, ["pageStart", "page_start"]),
    pageEnd: readNumber(raw, ["pageEnd", "page_end"]),
    originalText,
    cleanText,
    summary,
    keywords,
    tags,
    embeddingText: readString(
      raw,
      ["embeddingText", "embedding_text"],
      `${keywords.join(" ")} ${tags.join(" ")} ${summary} ${cleanText}`,
    ),
  }
}

function scoreClause(clause: Clause, query: string): number {
  const normalizedQuery = normalizePersian(query).toLowerCase()
  const tokens = tokenize(query)

  if (!normalizedQuery || tokens.length === 0) return 0

  const clauseCode = normalizePersian(clause.clauseCode).toLowerCase()
  const titleText = normalizePersian(
    `${clause.chapterTitle} ${clause.sectionTitle}`,
  ).toLowerCase()

  const keywordText = normalizePersian(
    `${clause.keywords.join(" ")} ${clause.tags.join(" ")}`,
  ).toLowerCase()

  const bodyText = normalizePersian(
    `${clause.cleanText} ${clause.originalText}`,
  ).toLowerCase()

  const embeddingText = normalizePersian(clause.embeddingText).toLowerCase()

  let score = 0

  if (clauseCode.includes(normalizedQuery)) score += 100
  if (titleText.includes(normalizedQuery)) score += 70
  if (keywordText.includes(normalizedQuery)) score += 60
  if (bodyText.includes(normalizedQuery)) score += 45
  if (embeddingText.includes(normalizedQuery)) score += 35

  for (const token of tokens) {
    if (clauseCode.includes(token)) score += 35
    if (titleText.includes(token)) score += 25
    if (keywordText.includes(token)) score += 20
    if (bodyText.includes(token)) score += 10
    if (embeddingText.includes(token)) score += 8
  }

  return score
}

export function searchClauses(clauses: Clause[], query: string): Clause[] {
  const normalizedQuery = normalizePersian(query)

  if (normalizedQuery.length < 2) {
    return []
  }

  return clauses
    .map((clause) => ({
      clause,
      score: scoreClause(clause, normalizedQuery),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((item) => item.clause)
}