import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './QuestionModal.css';

const QuestionModal = ({ onClose }) => {
  const { currentQuestion, teams, updateScore, markQuestionAnswered } = useGame();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [imageRevealed, setImageRevealed] = useState(false);

  if (!currentQuestion) return null;

  const { categoryId, questionIndex, question, answer, points, image, answerImage, categoryName } = currentQuestion;

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
  };

  const handleCorrectAnswer = () => {
    if (selectedTeam) {
      updateScore(selectedTeam, points);
      markQuestionAnswered(categoryId, questionIndex);
      setIsCorrect(true);
      setShowResult(true);
      // Если есть картинка-ответ, показываем её с небольшой задержкой для эффекта
      if (answerImage) {
        setTimeout(() => {
          setImageRevealed(true);
        }, 300);
      }
    }
  };

  const handleWrongAnswer = () => {
    if (selectedTeam) {
      updateScore(selectedTeam, -points);
      markQuestionAnswered(categoryId, questionIndex);
      setIsCorrect(false);
      setShowResult(true);
      // Даже при неправильном ответе показываем картинку-ответ
      if (answerImage) {
        setTimeout(() => {
          setImageRevealed(true);
        }, 300);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  // Определяем какую картинку показывать
  const displayImage = (showResult && imageRevealed && answerImage) ? answerImage : image;

  return (
    <div className="question-modal-overlay">
      <div className="question-modal">
        <button 
          className="close-modal-btn"
          onClick={handleClose}
        >
          ×
        </button>

        <div className="modal-header">
          <div className="category-name">{categoryName}</div>
          <div className="points-badge">{points} баллов</div>
        </div>

        <div className="modal-content-scrollable">
          <div className="modal-content">
            {displayImage && (
              <div className="question-image-container">
                <img 
                  src={displayImage} 
                  alt="Question" 
                  className={`question-image ${showResult && imageRevealed && answerImage ? 'answer-reveal-image' : ''}`}
                />
                {showResult && imageRevealed && answerImage && (
                  <div className="image-reveal-label">✓ Правильный ответ</div>
                )}
              </div>
            )}
            <div className="question-text">{question}</div>
            
            {showResult && (
              <div className={`answer-reveal ${isCorrect ? 'correct' : 'wrong'}`}>
                <div className="answer-label">
                  {isCorrect ? '✓ Правильно!' : '✗ Неправильно'}
                </div>
                <div className="answer-text">
                  <strong>Правильный ответ:</strong> {answer}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {!showResult && (
            <>
              <div className="teams-selection">
                <h3 className="selection-title">Выберите команду:</h3>
                <div className="teams-buttons">
                  {teams.map((team) => (
                    <button
                      key={team.id}
                      className={`team-select-btn ${selectedTeam === team.id ? 'selected' : ''}`}
                      onClick={() => handleTeamSelect(team.id)}
                    >
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="action-btn correct-btn"
                  onClick={handleCorrectAnswer}
                  disabled={!selectedTeam}
                >
                  ✓ Правильно (+{points})
                </button>
                <button 
                  className="action-btn wrong-btn"
                  onClick={handleWrongAnswer}
                  disabled={!selectedTeam}
                >
                  ✗ Неправильно (-{points})
                </button>
              </div>
            </>
          )}

          {showResult && (
            <div className="modal-actions">
              <button 
                className="action-btn close-btn"
                onClick={handleClose}
              >
                Продолжить →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;