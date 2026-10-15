import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Tática — Quem Está Olhando?', description: 'Uma revista para olhar além. Segurança pública na era digital.' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
