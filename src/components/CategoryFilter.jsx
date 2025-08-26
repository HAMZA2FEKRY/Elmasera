import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { questionCategories } from '../data/questions';

const CategoryFilter = ({ selectedCategory, onCategoryChange, answers }) => {
  const getCategoryStats = (categoryId) => {
    const categoryQuestions = [];
    let questionId = 1;
    
    questionCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.questions.forEach(question => {
          if (category.id === categoryId) {
            categoryQuestions.push(questionId);
          }
          questionId++;
        });
      });
    });
    
    const answeredInCategory = categoryQuestions.filter(id => answers[id]).length;
    const totalInCategory = categoryQuestions.length;
    
    return { answered: answeredInCategory, total: totalInCategory };
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-right">فلترة حسب الفئة</h3>
      <div className="flex flex-wrap gap-2 justify-end">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => onCategoryChange('all')}
          className="mb-2"
        >
          جميع الفئات
          <Badge variant="secondary" className="mr-2">
            {Object.keys(answers).length}
          </Badge>
        </Button>
        
        {questionCategories.map(category => {
          const stats = getCategoryStats(category.id);
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => onCategoryChange(category.id)}
              className="mb-2 flex items-center gap-2"
            >
              <span>{category.icon}</span>
              <span>{category.title}</span>
              <Badge variant="secondary" className="mr-1">
                {stats.answered}/{stats.total}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;

