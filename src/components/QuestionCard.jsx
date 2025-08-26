import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, answer }) => {
  const [currentAnswer, setCurrentAnswer] = useState(answer || null);

  const handleAnswer = (value) => {
    setCurrentAnswer(value);
    onAnswer(question.id, value);
  };

  const getAnswerIcon = (value) => {
    if (currentAnswer === value) {
      return value === 'yes' ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600" />
      );
    }
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getAnswerButtonClass = (value) => {
    const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200";
    if (currentAnswer === value) {
      return value === 'yes' 
        ? `${baseClass} bg-green-100 text-green-800 border-2 border-green-300`
        : `${baseClass} bg-red-100 text-red-800 border-2 border-red-300`;
    }
    return `${baseClass} bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100`;
  };

  return (
    <Card className="w-full mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
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
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => handleAnswer('yes')}
            className={getAnswerButtonClass('yes')}
          >
            {getAnswerIcon('yes')}
            <span className="font-medium">نعم</span>
          </button>
          <button
            onClick={() => handleAnswer('no')}
            className={getAnswerButtonClass('no')}
          >
            {getAnswerIcon('no')}
            <span className="font-medium">لا</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

