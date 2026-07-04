import { useGame } from '../../context/GameContext';
import CategoryColumn from './CategoryColumn';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import QuestionModal from '../QuestionModal/QuestionModal';
import './GameBoard.css';

const GameBoard = () => {
  const { categories, currentQuestion, closeQuestion } = useGame();

  return (
    <div className="game-board-wrapper">
      <div className="game-board-container">
        <div className="categories-grid">
          {categories.map((category) => (
            <CategoryColumn key={category.id} category={category} />
          ))}
        </div>
      </div>

      <ScoreBoard />

      {currentQuestion && (
        <QuestionModal onClose={closeQuestion} />
      )}
    </div>
  );
};

export default GameBoard;