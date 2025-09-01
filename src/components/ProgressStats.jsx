import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, TrendingUp, HelpCircle, RotateCcw } from 'lucide-react';

const ProgressStats = ({ answers, totalQuestions }) => {
  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
  const noCount = Object.values(answers).filter(answer => answer === 'no').length;
  const notMatchCount = Object.values(answers).filter(answer => answer === 'not_match').length;
  const tryingCount = Object.values(answers).filter(answer => answer === 'trying').length;
  
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  const positivePercentage = answeredCount > 0 ? (yesCount / answeredCount) * 100 : 0;
  const negativePercentage = answeredCount > 0 ? (noCount / answeredCount) * 100 : 0;
  const notMatchPercentage = answeredCount > 0 ? (notMatchCount / answeredCount) * 100 : 0;
  const tryingPercentage = answeredCount > 0 ? (tryingCount / answeredCount) * 100 : 0;

  // Calculate performance score
  const performanceScore = answeredCount > 0 ? 
    ((yesCount * 100 + tryingCount * 50 + notMatchCount * 25 + noCount * 0) / (answeredCount * 100)) * 100 : 0;

  return (
    <div className="space-y-6 mb-6">
      {/* Overall Performance Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-100 border-purple-200">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-purple-800 text-center">
            تحليل الأداء الشامل
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-purple-900 mb-2">
              {performanceScore.toFixed(1)}%
            </div>
            <p className="text-purple-700">نقاط الأداء الإجمالية</p>
          </div>
          <Progress value={performanceScore} className="h-3 mb-2" />
          <div className="text-center text-sm text-purple-600">
            {performanceScore >= 80 ? 'أداء ممتاز' : 
             performanceScore >= 60 ? 'أداء جيد' : 
             performanceScore >= 40 ? 'أداء متوسط' : 'يحتاج تحسين'}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              نعم
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
            <div className="text-xs text-green-600 mt-1">
              100 نقطة لكل إجابة
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              بحاول
            </CardTitle>
            <RotateCcw className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {tryingCount}
            </div>
            <p className="text-xs text-blue-700">
              {tryingPercentage.toFixed(1)}% من المجاب عليها
            </p>
            <div className="text-xs text-blue-600 mt-1">
              50 نقطة لكل إجابة
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">
              لم يطابق
            </CardTitle>
            <HelpCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">
              {notMatchCount}
            </div>
            <p className="text-xs text-orange-700">
              {notMatchPercentage.toFixed(1)}% من المجاب عليها
            </p>
            <div className="text-xs text-orange-600 mt-1">
              25 نقطة لكل إجابة
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              لا
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {noCount}
            </div>
            <p className="text-xs text-red-700">
              {negativePercentage.toFixed(1)}% من المجاب عليها
            </p>
            <div className="text-xs text-red-600 mt-1">
              0 نقطة لكل إجابة
            </div>
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

      {/* Performance Insights */}
      {answeredCount > 0 && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-md font-semibold text-indigo-800">
              رؤى الأداء
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">نقاط القوة:</h4>
                <ul className="space-y-1 text-indigo-600">
                  {yesCount > 0 && <li>• {yesCount} إجابة إيجابية مكتملة</li>}
                  {tryingCount > 0 && <li>• {tryingCount} محاولة للتحسين</li>}
                  {progressPercentage > 50 && <li>• تقدم جيد في الإجابة على الأسئلة</li>}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-indigo-700 mb-2">مجالات التحسين:</h4>
                <ul className="space-y-1 text-indigo-600">
                  {noCount > 0 && <li>• {noCount} مجال يحتاج انتباه</li>}
                  {notMatchCount > 0 && <li>• {notMatchCount} سؤال غير مطابق للحالة</li>}
                  {(totalQuestions - answeredCount) > 0 && <li>• {totalQuestions - answeredCount} سؤال لم يتم الإجابة عليه</li>}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgressStats;

