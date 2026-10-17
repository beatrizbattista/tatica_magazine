import type { Metadata } from 'next';
import './globals.css';
import './reportage.css';
import './reading-layout.css';
import './editorial-design.css'; // Editorial reading experience
export const metadata: Metadata = { title: 'Tática — Quem Está Olhando?', description: 'Segurança das pessoas e uso indevido de dados: casos reais, inteligência artificial, prevenção de fraudes e responsabilidade institucional.' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="pt-BR"><body>{children}</body></html>; }
