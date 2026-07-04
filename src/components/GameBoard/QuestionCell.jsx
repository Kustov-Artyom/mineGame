import './GameBoard.css';
import { useGame } from '../../context/GameContext';

const QuestionCell = ({ categoryId, questionIndex, points, isAnswered }) => {
  const { openQuestion } = useGame();

  const handleClick = () => {
    if (!isAnswered) {
      openQuestion(categoryId, questionIndex);
    }
  };

  return (
    <button
      className={`question-cell ${isAnswered ? 'answered' : ''}`}
      onClick={handleClick}
      disabled={isAnswered}
    >
      <span className="points-value">{points}</span>
    </button>
  );
};

export default QuestionCell;