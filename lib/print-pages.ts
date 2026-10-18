import printPages from '@/lib/print-pages.json';

// Page numbers of the printed A4 edition (Ctrl+P), so the site and the paper share one folio.
export type PrintSection = keyof typeof printPages.sections;

export const printTotal = printPages.total;
export const printSections = Object.entries(printPages.sections) as [PrintSection, number[]][];

const pad = (n: number) => String(n).padStart(2, '0');

export function folio(id: PrintSection) {
 const [first, last] = printPages.sections[id];
 return first === last ? `PÁG. ${pad(first)}` : `PÁGS. ${pad(first)}–${pad(last)}`;
}

export function pageLabel(page: number) {
 return `PÁG. ${pad(page)} / ${pad(printTotal)}`;
}
