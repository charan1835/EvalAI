import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { ViewProvider } from '@/context/ViewContext';

export const metadata = {
  title: 'EvalAI | Software Interview Dashboard',
  description: 'AI-Powered NLP Software Interview Practice Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <ViewProvider>
          <Sidebar />
          <main className="flex-1 ml-68 min-h-screen relative flex flex-col">
            <TopBar />
            <div className="flex-1 px-12 py-12 no-scrollbar">
              {children}
            </div>
          </main>
        </ViewProvider>
      </body>
    </html>
  );
}
