import './globals.css';

export const metadata = {
  title: 'EvalAI – Software Interview Evaluator',
  description: 'Practice software engineering interview questions and get instant AI-powered feedback on your answers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
