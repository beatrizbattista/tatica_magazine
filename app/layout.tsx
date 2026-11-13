import type { Metadata } from 'next';
import './design-tokens.css';
import './globals.css';
import './reportage.css';
import './reading-layout.css';
import './editorial-design.css'; // Editorial reading experience
import './visual-evidence.css';
import './print.css'; // Paginated A4 edition
export const metadata: Metadata = { title: 'Tática — Quem Está Olhando?', description: 'Segurança das pessoas e uso indevido de dados: casos reais, inteligência artificial, prevenção de fraudes e responsabilidade institucional.' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return <html lang="pt-BR">
    {/* Browser extensions may add body attributes (for example cz-shortcut-listen)
        before hydration. Accept those attributes; child content is still checked. */}
    <body suppressHydrationWarning>{children}</body>
  </html>;
}
