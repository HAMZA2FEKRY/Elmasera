import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Circle, HelpCircle, Clock } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, answer }) => {
  const [currentAnswer, setCurrentAnswer] = useState(answer || null);

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
    onAnswer(question.id, value);
  };

  const getAnswerIcon = (value) => {
    if (currentAnswer === value) {
      switch (value) {
        case 'yes':
          return <CheckCircle className="w-5 h-5 text-green-600" />;
        case 'no':
          return <XCircle className="w-5 h-5 text-red-600" />;
        case 'not_match':
          return <HelpCircle className="w-5 h-5 text-orange-600" />;
        case 'trying':
          return <Clock className="w-5 h-5 text-blue-600" />;
        default:
          return <Circle className="w-5 h-5 text-gray-400" />;
      }
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getAnswerButtonClass = (value) => {
    const baseClass = "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium";
    if (currentAnswer === value) {
      switch (value) {
        case 'yes':
          return `${baseClass} bg-green-100 text-green-800 border-2 border-green-300`;
        case 'no':
          return `${baseClass} bg-red-100 text-red-800 border-2 border-red-300`;
        case 'not_match':
          return `${baseClass} bg-orange-100 text-orange-800 border-2 border-orange-300`;
        case 'trying':
          return `${baseClass} bg-blue-100 text-blue-800 border-2 border-blue-300`;
        default:
          return `${baseClass} bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100`;
      }
    }
    return `${baseClass} bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100`;
  };

  return (
    <Card className="w-full mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 question-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">
              {question.categoryTitle} • {question.subcategoryTitle}
            </div>
            <CardTitle className="text-lg leading-relaxed text-right">
              {question.question}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => handleAnswer('yes')}
            className={getAnswerButtonClass('yes')}
          >
            {getAnswerIcon('yes')}
            <span>نعم</span>
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className={getAnswerButtonClass('no')}
          >
            {getAnswerIcon('no')}
            <span>لا</span>
          </button>
          <button
            onClick={() => handleAnswer('not_match')}
            className={getAnswerButtonClass('not_match')}
          >
            {getAnswerIcon('not_match')}
            <span>لم يطابق</span>
          </button>
          <button
            onClick={() => handleAnswer('trying')}
            className={getAnswerButtonClass('trying')}
          >
            {getAnswerIcon('trying')}
            <span>بحاول</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

