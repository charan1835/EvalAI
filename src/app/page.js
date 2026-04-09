'use client';

import { useState, useEffect } from 'react';
import { useEvalAI } from '@/hooks/useEvalAI';
import { useView } from '@/context/ViewContext';
import { useAuth } from '@/hooks/useAuth';

// Views
import LoadingView from '@/components/views/LoadingView';
import LoginView from '@/components/views/LoginView';
import DashboardView from '@/components/views/DashboardView';
import HistoryView from '@/components/views/HistoryView';
import QuestionBankView from '@/components/views/QuestionBankView';
import QuizView from '@/components/views/QuizView';
import PlaceholderView from '@/components/views/PlaceholderView';
import MockInterviewView from '@/components/views/MockInterviewView';

export default function Home() {
   const { currentView, setCurrentView } = useView();
   const { user, loading: authLoading, authError, login, verify, logout } = useAuth();
   const {
      categories, category, setCategory,
      question, meta, reference,
      userAnswer, setUserAnswer,
      result, history, loading, evaluating, error,
      getQuestion, evaluate, getAllQuestions, allQuestions,
      startQuiz, quiz, setQuiz
   } = useEvalAI();

   // Local Component State
   const [email, setEmail] = useState('');
   const [otp, setOtp] = useState('');
   const [step, setStep] = useState('email'); 
   const [signingIn, setSigningIn] = useState(false);
   const [quizIndex, setQuizIndex] = useState(0);
   const [quizAnswers, setQuizAnswers] = useState({});
   const [quizSubmitted, setQuizSubmitted] = useState(false);
   const [quizScore, setQuizScore] = useState(0);
   const [quizTimer, setQuizTimer] = useState(0); 
   const [bankSearch, setBankSearch] = useState('');

   // Handlers
   const handleRequestOTP = async (e) => {
      e.preventDefault();
      setSigningIn(true);
      const success = await login(email);
      if (success) setStep('otp');
      setSigningIn(false);
   };

   const handleVerifyOTP = async (e) => {
      e.preventDefault();
      setSigningIn(true);
      await verify(email, otp);
      setSigningIn(false);
   };

   // Effects
   useEffect(() => {
      if (currentView === 'Questions Bank') {
         getAllQuestions();
      }
   }, [currentView]);

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

   const handleQuizSubmit = () => {
      let score = 0;
      quiz.questions.forEach((q, idx) => {
         if (quizAnswers[idx] === q.answer) score++;
      });
      setQuizScore(score);
      setQuizSubmitted(true);
   };

   const resetQuiz = () => {
      setQuiz(null);
      setQuizIndex(0);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
      setQuizTimer(0);
   };

   // Render Logic
   if (authLoading) return <LoadingView />;
   
   if (!user) return (
      <LoginView 
         step={step} email={email} setEmail={setEmail} otp={otp} setOtp={setOtp}
         authError={authError} signingIn={signingIn} setStep={setStep}
         handleRequestOTP={handleRequestOTP} handleVerifyOTP={handleVerifyOTP}
      />
   );

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
               allQuestions={allQuestions} loading={loading} 
               bankSearch={bankSearch} setBankSearch={setBankSearch} 
               setCurrentView={setCurrentView} 
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
      case 'Settings':
         return <PlaceholderView currentView={currentView} setCurrentView={setCurrentView} />;

      default:
         return <DashboardView user={user} history={history} setCurrentView={setCurrentView} logout={logout} />;
   }
}
