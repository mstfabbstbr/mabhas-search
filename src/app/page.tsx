"use client"

import { useMemo, useState } from "react"
import SearchBar from "@/components/SearchBar"
import ResultCard from "@/components/ResultCard"
import { mapRawClause, searchClauses } from "@/lib/search"
import { Clause, RawClause } from "@/types/clause"
import rawClauses from "@/data/clauses.json"

function extractRawClauses(data: unknown): RawClause[] {
  if (Array.isArray(data)) return data as RawClause[]

  if (data && typeof data === "object") {
    const objectData = data as Record<string, unknown>
    const possibleKeys = ["clauses", "records", "data", "items", "results"]

    for (const key of possibleKeys) {
      const value = objectData[key]
      if (Array.isArray(value)) return value as RawClause[]
    }
  }

  return []
}

export default function Home() {
  const [query, setQuery] = useState("")

  const clauses = useMemo<Clause[]>(() => {
    return extractRawClauses(rawClauses).map(mapRawClause)
  }, [])

  const results = useMemo(() => {
    return searchClauses(clauses, query)
  }, [clauses, query])

  const hasQuery = query.trim().length > 0

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-4 py-8" dir="rtl">
      <div className="mx-auto max-w-5xl">
        <section className="mb-8 rounded-[2rem] bg-gradient-to-br from-emerald-950 to-stone-900 p-7 text-white shadow-lg">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-50">
              مبحث چهارم مقررات ملی ساختمان
            </div>

            <h1 className="text-3xl font-black leading-tight md:text-4xl">
              جستجوی سریع و دقیق در بندهای مقررات
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-stone-200">
              چند کلمه وارد کن تا بندهای مرتبط، صفحه، خلاصه و متن اصلی مقررات
              را ببینی.
            </p>
          </div>
        </section>

        <SearchBar value={query} onChange={setQuery} />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-medium text-stone-600">
            {hasQuery
              ? `${results.length} نتیجه برای «${query}»`
              : `تعداد بندهای آماده جستجو: ${clauses.length}`}
          </div>

          {hasQuery && (
            <button
              onClick={() => setQuery("")}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-600 transition hover:border-red-300 hover:text-red-600"
            >
              پاک کردن جستجو
            </button>
          )}
        </div>

        {!hasQuery && (
          <section className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-black text-stone-900">
              چطور جستجو کنم؟
            </h2>

            <p className="text-sm leading-8 text-stone-600">
              عبارت را کوتاه و موضوعی وارد کن. مثلاً به‌جای جمله کامل، بنویس:
              «نورگیری»، «توقفگاه خودرو»، «بالکن»، «تصرف اداری» یا «حیاط
              خلوت».
            </p>
          </section>
        )}

        <section className="mt-6 space-y-4">
          {hasQuery && results.length === 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-6 text-sm leading-8 text-stone-600 shadow-sm">
              نتیجه‌ای پیدا نشد. عبارت را کوتاه‌تر یا رسمی‌تر امتحان کن؛ مثلاً
              به‌جای «پارکینگ» بنویس «توقفگاه خودرو».
            </div>
          )}

          {results.map((clause) => (
            <ResultCard key={clause.id || clause.clauseCode} clause={clause} />
          ))}
        </section>
      </div>
    </main>
  )
}