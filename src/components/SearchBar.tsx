interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

const suggestions = [
  "نورگیری آشپزخانه",
  "توقفگاه خودرو",
  "تصرف اداری",
  "حیاط خلوت",
  "بالکن",
]

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white/90 p-4 shadow-sm">
      <label className="mb-2 block text-sm font-semibold text-stone-700">
        عبارت جستجو
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="مثلاً: نورگیری آشپزخانه، پارکینگ، تصرف اداری"
        className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 text-right text-base text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white focus:ring-4 focus:ring-emerald-700/10"
        dir="rtl"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-600 transition hover:border-emerald-700 hover:text-emerald-800"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}