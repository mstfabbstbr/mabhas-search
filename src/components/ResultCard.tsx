import { Clause } from "@/types/clause"

interface ResultCardProps {
  clause: Clause
}

export default function ResultCard({ clause }: ResultCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="border-b border-stone-100 bg-stone-50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-stone-500">شماره بند</div>
            <div className="mt-1 text-lg font-black text-emerald-900">
              {clause.clauseCode || "بدون شماره"}
            </div>
          </div>

          {clause.pageStart && (
            <div className="rounded-full bg-emerald-900 px-3 py-1 text-xs font-semibold text-white">
              صفحه {clause.pageStart}
            </div>
          )}
        </div>

        <div className="mt-3 text-sm leading-7 text-stone-600">
          {clause.chapterTitle}
          {clause.sectionTitle ? ` / ${clause.sectionTitle}` : ""}
        </div>
      </div>

      <div className="p-5">
        {clause.summary && (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-8 text-stone-800">
            <span className="font-bold text-amber-900">خلاصه: </span>
            {clause.summary}
          </div>
        )}

        <details className="group">
          <summary className="cursor-pointer list-none rounded-2xl bg-stone-100 px-4 py-3 text-sm font-bold text-stone-800 transition hover:bg-stone-200">
            مشاهده متن اصلی مقررات
            <span className="mr-2 text-stone-500 group-open:hidden">+</span>
            <span className="mr-2 hidden text-stone-500 group-open:inline">−</span>
          </summary>

          <p className="mt-4 whitespace-pre-line rounded-2xl bg-white text-sm leading-9 text-stone-800">
            {clause.originalText}
          </p>
        </details>

        {clause.keywords.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {clause.keywords.slice(0, 8).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}