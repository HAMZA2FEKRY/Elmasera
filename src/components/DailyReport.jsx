import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, CheckCircle, XCircle, HelpCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { questionCategories, getAllQuestions } from '../data/questions';

const DailyReport = ({ answers }) => {
  const allQuestions = getAllQuestions();
  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
  const noCount = Object.values(answers).filter(answer => answer === 'no').length;
  const notMatchCount = Object.values(answers).filter(answer => answer === 'not_match').length;
  const tryingCount = Object.values(answers).filter(answer => answer === 'trying').length;
  
  // Calculate performance score
  const performanceScore = answeredCount > 0 ? 
    ((yesCount * 100 + tryingCount * 50 + notMatchCount * 25 + noCount * 0) / (answeredCount * 100)) * 100 : 0;
  
  const generateReport = () => {
    const today = new Date().toLocaleDateString('ar-EG');
    let reportText = `تقرير المحاسبة اليومية المفصل - ${today}\n`;
    reportText += `${'='.repeat(60)}\n\n`;
    
    reportText += `الإحصائيات العامة:\n`;
    reportText += `- إجمالي الأسئلة: ${allQuestions.length}\n`;
    reportText += `- الأسئلة المجاب عليها: ${answeredCount}\n`;
    reportText += `- نسبة الإنجاز: ${((answeredCount / allQuestions.length) * 100).toFixed(1)}%\n`;
    reportText += `- نقاط الأداء الإجمالية: ${performanceScore.toFixed(1)}%\n\n`;
    
    reportText += `تفصيل الإجابات:\n`;
    reportText += `- نعم (100 نقطة): ${yesCount} إجابة\n`;
    reportText += `- بحاول (50 نقطة): ${tryingCount} إجابة\n`;
    reportText += `- لم يطابق (25 نقطة): ${notMatchCount} إجابة\n`;
    reportText += `- لا (0 نقطة): ${noCount} إجابة\n`;
    reportText += `- غير مجاب عليها: ${allQuestions.length - answeredCount} سؤال\n\n`;
    
    reportText += `تقييم الأداء:\n`;
    if (performanceScore >= 80) {
      reportText += `- التقييم: ممتاز 🌟\n`;
      reportText += `- التعليق: أداء رائع، استمر على هذا المنوال!\n`;
    } else if (performanceScore >= 60) {
      reportText += `- التقييم: جيد ✅\n`;
      reportText += `- التعليق: أداء جيد، يمكن تحسينه أكثر.\n`;
    } else if (performanceScore >= 40) {
      reportText += `- التقييم: متوسط ⚠️\n`;
      reportText += `- التعليق: هناك مجال للتحسين، ركز على النقاط الضعيفة.\n`;
    } else {
      reportText += `- التقييم: يحتاج تحسين 🔄\n`;
      reportText += `- التعليق: ابدأ بخطوات صغيرة وستصل للهدف.\n`;
    }
    reportText += `\n`;
    
    questionCategories.forEach(category => {
      const categoryQuestions = allQuestions.filter(q => q.categoryId === category.id);
      const categoryAnswers = categoryQuestions.filter(q => answers[q.id]);
      
      if (categoryAnswers.length > 0) {
        const categoryReport = getCategoryReport(category.id);
        reportText += `${category.title} ${category.icon}\n`;
        reportText += `${'-'.repeat(40)}\n`;
        reportText += `نقاط الأداء: ${categoryReport.score.toFixed(1)}%\n`;
        reportText += `الإجابات: ${categoryReport.answered}/${categoryReport.total}\n\n`;
        
        category.subcategories.forEach(subcategory => {
          const subcategoryQuestions = categoryQuestions.filter(q => q.subcategoryId === subcategory.id);
          const subcategoryAnswers = subcategoryQuestions.filter(q => answers[q.id]);
          
          if (subcategoryAnswers.length > 0) {
            reportText += `${subcategory.title}:\n`;
            subcategoryAnswers.forEach(q => {
              let answer = '';
              switch (answers[q.id]) {
                case 'yes': answer = '✅ نعم'; break;
                case 'trying': answer = '🔄 بحاول'; break;
                case 'not_match': answer = '❓ لم يطابق'; break;
                case 'no': answer = '❌ لا'; break;
                default: answer = '⏳ لم يجب';
              }
              reportText += `  ${answer} - ${q.question}\n`;
            });
            reportText += `\n`;
          }
        });
      }
    });
    
    reportText += `\nتوصيات للتحسين:\n`;
    reportText += `${'-'.repeat(30)}\n`;
    if (noCount > 0) {
      reportText += `- ركز على ${noCount} مجال حصل على "لا" وحاول تحسينها تدريجياً\n`;
    }
    if (tryingCount > 0) {
      reportText += `- استمر في المحاولة في ${tryingCount} مجال، أنت على الطريق الصحيح\n`;
    }
    if ((allQuestions.length - answeredCount) > 0) {
      reportText += `- أكمل الإجابة على ${allQuestions.length - answeredCount} سؤال متبقي\n`;
    }
    reportText += `- راجع الأسئلة التي حصلت على "لم يطابق" وتأكد من فهمها\n`;
    
    // إنشاء ملف للتحميل
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `تقرير-المحاسبة-اليومية-${today.replace(/\//g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getCategoryReport = (categoryId) => {
    const categoryQuestions = allQuestions.filter(q => q.categoryId === categoryId);
    const categoryAnswers = categoryQuestions.filter(q => answers[q.id]);
    const categoryYes = categoryQuestions.filter(q => answers[q.id] === 'yes').length;
    const categoryTrying = categoryQuestions.filter(q => answers[q.id] === 'trying').length;
    const categoryNotMatch = categoryQuestions.filter(q => answers[q.id] === 'not_match').length;
    const categoryNo = categoryQuestions.filter(q => answers[q.id] === 'no').length;
    
    const score = categoryAnswers.length > 0 ? 
      ((categoryYes * 100 + categoryTrying * 50 + categoryNotMatch * 25 + categoryNo * 0) / (categoryAnswers.length * 100)) * 100 : 0;
    
    return {
      total: categoryQuestions.length,
      answered: categoryAnswers.length,
      positive: categoryYes,
      trying: categoryTrying,
      notMatch: categoryNotMatch,
      negative: categoryNo,
      score: score
    };
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>التقرير اليومي المفصل</span>
          </div>
          <Button onClick={generateReport} size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تحميل التقرير
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Performance */}
          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-bold text-purple-800">نقاط الأداء الإجمالية</h3>
            </div>
            <div className="text-4xl font-bold text-purple-900 mb-2">{performanceScore.toFixed(1)}%</div>
            <div className="text-purple-700">
              {performanceScore >= 80 ? 'أداء ممتاز 🌟' : 
               performanceScore >= 60 ? 'أداء جيد ✅' : 
               performanceScore >= 40 ? 'أداء متوسط ⚠️' : 'يحتاج تحسين 🔄'}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">{yesCount}</div>
              <div className="text-xs text-green-800">نعم</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <RotateCcw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-600">{tryingCount}</div>
              <div className="text-xs text-blue-800">بحاول</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <HelpCircle className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-600">{notMatchCount}</div>
              <div className="text-xs text-orange-800">لم يطابق</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-600">{noCount}</div>
              <div className="text-xs text-red-800">لا</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-xl font-bold text-gray-600">{allQuestions.length - answeredCount}</div>
              <div className="text-xs text-gray-800">غير مجاب</div>
            </div>
          </div>
          
          {/* Category Breakdown */}
          <div className="space-y-3">
            <h4 className="font-semibold text-right text-lg">تفصيل حسب الفئات:</h4>
            {questionCategories.map(category => {
              const report = getCategoryReport(category.id);
              const percentage = report.total > 0 ? (report.answered / report.total) * 100 : 0;
              
              return (
                <div key={category.id} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium text-lg">{category.title}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">{report.score.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">{report.answered}/{report.total} أسئلة</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mb-1" />
                      <span className="text-green-600 font-medium">{report.positive}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <RotateCcw className="h-4 w-4 text-blue-600 mb-1" />
                      <span className="text-blue-600 font-medium">{report.trying}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <HelpCircle className="h-4 w-4 text-orange-600 mb-1" />
                      <span className="text-orange-600 font-medium">{report.notMatch}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <XCircle className="h-4 w-4 text-red-600 mb-1" />
                      <span className="text-red-600 font-medium">{report.negative}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recommendations */}
          {answeredCount > 0 && (
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">توصيات للتحسين:</h4>
              <ul className="space-y-2 text-sm text-indigo-700">
                {noCount > 0 && (
                  <li>• ركز على {noCount} مجال حصل على "لا" وحاول تحسينها تدريجياً</li>
                )}
                {tryingCount > 0 && (
                  <li>• استمر في المحاولة في {tryingCount} مجال، أنت على الطريق الصحيح</li>
                )}
                {(allQuestions.length - answeredCount) > 0 && (
                  <li>• أكمل الإجابة على {allQuestions.length - answeredCount} سؤال متبقي</li>
                )}
                {notMatchCount > 0 && (
                  <li>• راجع الأسئلة التي حصلت على "لم يطابق" وتأكد من فهمها</li>
                )}
                <li>• حدد هدفاً يومياً للوصول لنقاط أداء أعلى</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyReport;

