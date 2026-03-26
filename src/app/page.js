'use client';

import { useEvalAI }       from '@/hooks/useEvalAI';
import Header              from '@/components/Header';
import CategoryFilter      from '@/components/CategoryFilter';
import QuestionCard        from '@/components/QuestionCard';

export default function Home() {
  const {
    categories, category, setCategory,
    question, meta, reference,
    userAnswer, setUserAnswer,
    result, loading, evaluating, error,
    getQuestion, evaluate,
  } = useEvalAI();

  return (
    <main className="max-w-3xl mx-auto px-5 py-12 pb-24 flex flex-col gap-8">

      <Header />

      <CategoryFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      {/* Get Question Button */}
      <div className="flex justify-center">
        <button
          id="btn-get-question"
          onClick={getQuestion}
          disabled={loading}
          className="flex items-center gap-2 px-10 py-3.5 rounded-full
            bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-semibold text-base
            shadow-[0_4px_22px_rgba(99,102,241,0.35)]
            hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 cursor-pointer min-w-[180px] justify-center"
        >
          {loading
            ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            : <><span>🎯</span> Get Question</>
          }
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/25 text-red-300 px-4 py-3 rounded-lg text-sm leading-relaxed">
          {error}
        </div>
      )}

      {/* Question + Answer + Result */}
      {question && (
        <QuestionCard
          question={question}
          meta={meta}
          reference={reference}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          onSubmit={evaluate}
          evaluating={evaluating}
          result={result}
        />
      )}

      <footer className="text-center text-[0.76rem] text-slate-600">
        Powered by{' '}
        <strong className="text-slate-500">FastAPI</strong> ·{' '}
        <strong className="text-slate-500">Sentence Transformers</strong> ·{' '}
        <strong className="text-slate-500">Next.js</strong> +{' '}
        <strong className="text-slate-500">Tailwind CSS v3</strong>
      </footer>

    </main>
  );
}
