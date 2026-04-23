import './globals.css';
import { ViewProvider } from '@/context/ViewContext';
import AppShell from '@/components/AppShell';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EvalAI — Advanced AI Software Interview Platform',
  description: 'Master your technical interviews with EvalAI. AI-powered semantic evaluation, mock simulations, and real-time feedback using Gemini 2.5.',
  keywords: 'software interview, ai mock interview, technical prep, gemini ai, coding interview practice',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ViewProvider>
          <AppShell>
            {children}
          </AppShell>
        </ViewProvider>
      </body>
    </html>
  );
}
