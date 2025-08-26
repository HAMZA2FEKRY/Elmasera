import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, BookOpen, Calendar, Settings } from 'lucide-react';
import QuestionCard from './components/QuestionCard';
import ProgressStats from './components/ProgressStats';
import CategoryFilter from './components/CategoryFilter';
import DailyReport from './components/DailyReport';
import { getAllQuestions } from './data/questions';
import './App.css';

function App() {
  const [answers, setAnswers] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('ar-EG'));
  
  const allQuestions = getAllQuestions();
  
  // تحميل الإجابات المحفوظة من localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answers-${currentDate}`);
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, [currentDate]);
  
  // حفظ الإجابات في localStorage
  useEffect(() => {
    localStorage.setItem(`answers-${currentDate}`, JSON.stringify(answers));
  }, [answers, currentDate]);
  
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const resetAnswers = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الإجابات؟')) {
      setAnswers({});
      localStorage.removeItem(`answers-${currentDate}`);
    }
  };
  
  const filteredQuestions = selectedCategory === 'all' 
    ? allQuestions 
    : allQuestions.filter(q => q.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold mb-2">
                  نظام المحاسبة اليومية
                </CardTitle>
                <p className="text-blue-100 text-lg">
                  تتبع مسيرتك الروحية والأخلاقية يومياً
                </p>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg font-semibold">{currentDate}</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {Object.keys(answers).length} / {allQuestions.length} مكتمل
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Stats */}
        <ProgressStats answers={answers} totalQuestions={allQuestions.length} />
        
        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
          <div className="flex gap-3">
            <Button 
              onClick={resetAnswers} 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة تعيين
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            >
              <BookOpen className="h-4 w-4" />
              عرض التقرير
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredQuestions.length} سؤال معروض
          </div>
        </div>
        
        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          answers={answers}
        />
        
        {/* Questions */}
        <div className="space-y-4 mb-8">
          {filteredQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={handleAnswer}
              answer={answers[question.id]}
            />
          ))}
        </div>
        
        {/* Daily Report */}
        <DailyReport answers={answers} />
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>نظام المحاسبة اليومية - لتتبع مسيرتك الروحية والأخلاقية</p>
          <p className="mt-1">جميع البيانات محفوظة محلياً في متصفحك</p>
        </div>
      </div>
    </div>
  );
}

export default App;
