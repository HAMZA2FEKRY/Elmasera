import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { questionCategories, getAllQuestions } from '../data/questions';

const DailyReport = ({ answers }) => {
  const allQuestions = getAllQuestions();
  const answeredCount = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
  const noCount = Object.values(answers).filter(answer => answer === 'no').length;
  
  const generateReport = () => {
    const today = new Date().toLocaleDateString('ar-EG');
    let reportText = `تقرير المحاسبة اليومية - ${today}\n`;
    reportText += `${'='.repeat(50)}\n\n`;
    
    reportText += `الإحصائيات العامة:\n`;
    reportText += `- إجمالي الأسئلة المجاب عليها: ${answeredCount} من ${allQuestions.length}\n`;
    reportText += `- الإجابات الإيجابية: ${yesCount}\n`;
    reportText += `- الإجابات السلبية: ${noCount}\n`;
    reportText += `- نسبة الإنجاز: ${((answeredCount / allQuestions.length) * 100).toFixed(1)}%\n\n`;
    
    questionCategories.forEach(category => {
      const categoryQuestions = allQuestions.filter(q => q.categoryId === category.id);
      const categoryAnswers = categoryQuestions.filter(q => answers[q.id]);
      
      if (categoryAnswers.length > 0) {
        reportText += `${category.title} ${category.icon}\n`;
        reportText += `${'-'.repeat(30)}\n`;
        
        category.subcategories.forEach(subcategory => {
          const subcategoryQuestions = categoryQuestions.filter(q => q.subcategoryId === subcategory.id);
          const subcategoryAnswers = subcategoryQuestions.filter(q => answers[q.id]);
          
          if (subcategoryAnswers.length > 0) {
            reportText += `\n${subcategory.title}:\n`;
            subcategoryAnswers.forEach(q => {
              const answer = answers[q.id] === 'yes' ? '✓' : '✗';
              reportText += `  ${answer} ${q.question}\n`;
            });
          }
        });
        reportText += '\n';
      }
    });
    
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
    
    return {
      total: categoryQuestions.length,
      answered: categoryAnswers.length,
      positive: categoryYes
    };
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>التقرير اليومي</span>
          </div>
          <Button onClick={generateReport} size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            تحميل التقرير
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{answeredCount}</div>
              <div className="text-sm text-blue-800">أسئلة مجاب عليها</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{yesCount}</div>
              <div className="text-sm text-green-800">إجابات إيجابية</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{noCount}</div>
              <div className="text-sm text-red-800">إجابات سلبية</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-right">تفصيل حسب الفئات:</h4>
            {questionCategories.map(category => {
              const report = getCategoryReport(category.id);
              const percentage = report.total > 0 ? (report.answered / report.total) * 100 : 0;
              
              return (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      {report.answered}/{report.total} ({percentage.toFixed(0)}%)
                    </span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{report.positive}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-600">{report.answered - report.positive}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyReport;

