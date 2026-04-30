'use client';

import { useState, useEffect } from 'react';
import { useEvalAI } from '@/hooks/useEvalAI';
import { useView } from '@/context/ViewContext';
import { useAuth } from '@/hooks/useAuth';
import { saveQuizHistory } from '@/lib/api';

// Views
import LoadingView from '@/components/views/LoadingView';
import LoginView from '@/components/views/LoginView';
import DashboardView from '@/components/views/DashboardView';
import HistoryView from '@/components/views/HistoryView';
import QuestionBankView from '@/components/views/QuestionBankView';
import QuizView from '@/components/views/QuizView';
import PlaceholderView from '@/components/views/PlaceholderView';
import MockInterviewView from '@/components/views/MockInterviewView';
import LeaderboardView from '@/components/views/LeaderboardView';

export default function Home() {
   const { currentView, setCurrentView } = useView();
   const {
     user, loading: authLoading, signingIn, authError,
     step, setStep, email, setEmail, otp, setOtp,
     handleRequestOTP, handleVerifyOTP, handleGuestLogin,
     logout,
   } = useAuth();

   const {
      categories, category, setCategory,
      question, meta, reference,
      userAnswer, setUserAnswer,
      result, history, loading, evaluating, error,
      getQuestion, evaluate, getHistory, getAllQuestions, allQuestions,
      bankLoading, bankError,
      startQuiz, quiz, setQuiz
   } = useEvalAI();

   // Local Component State
   const [quizIndex, setQuizIndex] = useState(0);
   const [quizAnswers, setQuizAnswers] = useState({});
   const [quizSubmitted, setQuizSubmitted] = useState(false);
   const [quizScore, setQuizScore] = useState(0);
   const [quizTimer, setQuizTimer] = useState(0); 
   const [bankSearch, setBankSearch] = useState('');

   // Retry fetching questions bank on navigation if it failed on mount
   useEffect(() => {
      if (currentView === 'Questions Bank' && allQuestions.length === 0) {
         getAllQuestions();
      }
   }, [currentView, getAllQuestions, allQuestions.length]);

   useEffect(() => {
     let interval;
     if (quiz && !quizSubmitted) {
       interval = setInterval(() => {
         setQuizTimer(prev => prev + 1);
       }, 1000);
     }
     return () => clearInterval(interval);
   }, [quiz, quizSubmitted]);

   // Helpers
   const formatTime = (seconds) => {
     const m = Math.floor(seconds / 60);
     const s = seconds % 60;
     return `${m}:${s < 10 ? '0' : ''}${s}`;
   };

   const handleQuizSubmit = async () => {
      const score = quiz.questions.filter(
        (q, i) => quizAnswers[i] === q.answer
      ).length;
      setQuizScore(score);
      setQuizSubmitted(true);

      // Save full quiz result as a single history entry
      try {
        await saveQuizHistory({
          topic: quiz.topic,
          score,
          total: quiz.questions.length,
          questions: quiz.questions,
          quizAnswers,
        });
        getHistory(); // Refresh history panel
      } catch (err) {
        console.error('Failed to save quiz history:', err);
      }
   };

   const resetQuiz = () => {
      setQuiz(null);
      setQuizIndex(0);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
      setQuizTimer(0);
   };

   // --- AUTH GATE ---
   // Show spinner while checking localStorage for existing session
   if (authLoading) {
      return <LoadingView />;
   }

   // Show login screen if not authenticated
   if (!user) {
      return (
         <LoginView
            step={step}
            email={email}
            setEmail={setEmail}
            otp={otp}
            setOtp={setOtp}
            authError={authError}
            signingIn={signingIn}
            handleRequestOTP={handleRequestOTP}
            handleVerifyOTP={handleVerifyOTP}
            handleGuestLogin={handleGuestLogin}
            setStep={setStep}
         />
      );
   }

   // --- MAIN APP (authenticated) ---
   switch (currentView) {
      case 'Dashboard':
         return <DashboardView user={user} history={history} setCurrentView={setCurrentView} logout={logout} />;
      
      case 'Mock Interview':
         return (
            <MockInterviewView 
               user={user} categories={categories} category={category} setCategory={setCategory}
               question={question} meta={meta} reference={reference} userAnswer={userAnswer} setUserAnswer={setUserAnswer}
               getQuestion={getQuestion} evaluate={evaluate} evaluating={evaluating} result={result}
               loading={loading} error={error}
            />
         );

      case 'Practice History':
         return <HistoryView history={history} setCurrentView={setCurrentView} />;

      case 'Questions Bank':
         return (
            <QuestionBankView
               allQuestions={allQuestions} loading={bankLoading} error={bankError}
               bankSearch={bankSearch} setBankSearch={setBankSearch}
               setCurrentView={setCurrentView} onRetry={getAllQuestions}
            />
         );

      case 'AI Quiz':
         return (
            <QuizView 
               quiz={quiz} loading={loading} startQuiz={startQuiz} quizIndex={quizIndex} setQuizIndex={setQuizIndex}
               quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} quizSubmitted={quizSubmitted}
               handleQuizSubmit={handleQuizSubmit} quizScore={quizScore} resetQuiz={resetQuiz}
               quizTimer={quizTimer} formatTime={formatTime}
            />
         );

      case 'Leaderboard':
         return <LeaderboardView setCurrentView={setCurrentView} user={user} />;

      case 'Settings':
         return <PlaceholderView currentView={currentView} setCurrentView={setCurrentView} />;

      default:
         return <DashboardView user={user} history={history} setCurrentView={setCurrentView} logout={logout} />;
   }
}
