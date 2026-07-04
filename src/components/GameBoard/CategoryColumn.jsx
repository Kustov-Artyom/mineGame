import QuestionCell from './QuestionCell';
import { useGame } from '../../context/GameContext';
import './GameBoard.css';

const CategoryColumn = ({ category }) => {
  const { isQuestionAnswered } = useGame();

  return (
    <div className="category-column">
      <div className="category-header">
        <h3 className="category-title">{category.name}</h3>
      </div>
      <div className="questions-list">
        {category.questions.map((question, index) => (
          <QuestionCell
            key={`${category.id}-${index}`}
            categoryId={category.id}
            questionIndex={index}
            points={question.points}
            isAnswered={isQuestionAnswered(category.id, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryColumn;