import ScoreCircle from './ScoreCircle';
import CoverageBar from './CoverageBar';
import KeywordChips from './KeywordChips';
import { GRADE_COLORS, gradeColor, feedbackHint, feedbackEmoji } from '@/lib/constants';

export default function ResultPanel({ result, reference }) {
  const grade = gradeColor(result.composite_score);
  const colors = GRADE_COLORS[grade];

  return (
    <div className="flex flex-col gap-5 animate-fade-up">

      {/* Score Circles */}
      <div className="flex justify-center gap-8 flex-wrap pt-2">
        <ScoreCircle label="Overall"  value={result.composite_score} />
        <ScoreCircle label="Semantic" value={result.semantic_score}  />
        <ScoreCircle label="Keywords" value={result.keyword_score}   />
      </div>

      {/* Feedback Banner */}
      <div className={`flex items-start gap-4 p-4 rounded-xl border ${colors.bg} ${colors.border}`}>
        <span className="text-2xl flex-shrink-0">{feedbackEmoji(result.composite_score)}</span>
        <div>
          <p className={`font-bold text-base ${colors.text}`}>{result.feedback}</p>
          <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">
            {feedbackHint(result.composite_score)}
          </p>
        </div>
      </div>

      {/* Keyword Coverage Bar */}
      <CoverageBar pct={result.keyword_coverage_pct} />

      {/* Keyword Chips */}
      <KeywordChips
        matched={result.matched_keywords}
        missed={result.missed_keywords}
      />

      {/* Reference Answer */}
      <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-2">
        <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">📖 Reference Answer</p>
        <p className="text-sm text-slate-400 leading-relaxed">{reference}</p>
      </div>

    </div>
  );
}
