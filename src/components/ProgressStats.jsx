import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';

const ProgressStats = ({ answers, totalQuestions }) => {
  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
  const noCount = Object.values(answers).filter(answer => answer === 'no').length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const positivePercentage = answeredCount > 0 ? (yesCount / answeredCount) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            التقدم الإجمالي
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900 mb-2">
            {answeredCount}/{totalQuestions}
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-blue-700 mt-2">
            {progressPercentage.toFixed(1)}% مكتمل
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            الإجابات الإيجابية
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">
            {yesCount}
          </div>
          <p className="text-xs text-green-700">
            {positivePercentage.toFixed(1)}% من المجاب عليها
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-800">
            الإجابات السلبية
          </CardTitle>
          <XCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-900">
            {noCount}
          </div>
          <p className="text-xs text-red-700">
            {answeredCount > 0 ? ((noCount / answeredCount) * 100).toFixed(1) : 0}% من المجاب عليها
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-800">
            في الانتظار
          </CardTitle>
          <Clock className="h-4 w-4 text-gray-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {totalQuestions - answeredCount}
          </div>
          <p className="text-xs text-gray-700">
            أسئلة لم يتم الإجابة عليها
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;

