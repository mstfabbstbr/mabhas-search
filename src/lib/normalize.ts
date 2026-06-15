export function normalizePersian(input: string): string {
  return input
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ة/g, "ه")
    .replace(/ۀ/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/إ|أ|ٱ/g, "ا")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[۰٠]/g, "0")
    .replace(/[۱١]/g, "1")
    .replace(/[۲٢]/g, "2")
    .replace(/[۳٣]/g, "3")
    .replace(/[۴٤]/g, "4")
    .replace(/[۵٥]/g, "5")
    .replace(/[۶٦]/g, "6")
    .replace(/[۷٧]/g, "7")
    .replace(/[۸٨]/g, "8")
    .replace(/[۹٩]/g, "9")
    .replace(/[‌\u200c]/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .trim()
}

export function tokenize(input: string): string[] {
  return normalizePersian(input)
    .toLowerCase()
    .split(" ")
    .map((item) => item.trim())
    .filter(Boolean)
}