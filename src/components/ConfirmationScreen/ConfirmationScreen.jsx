import { useGame } from '../../context/GameContext';
import './ConfirmationScreen.css';

const ConfirmationScreen = () => {
  const { teams, setCurrentScreen } = useGame();

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleBack = () => {
    setCurrentScreen('setup');
  };

  return (
    <div className="confirmation-screen">
      <div className="confirmation-container">
        <h1 className="confirmation-title">Готовы начать?</h1>
        
        <div className="teams-preview">
          <h2 className="preview-subtitle">Участвующие команды:</h2>
          <div className="teams-grid">
            {teams.map((team, index) => (
              <div key={team.id} className="team-card">
                <div className="team-number">{index + 1}</div>
                <div className="team-name">{team.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="game-info">
          <p className="info-text">
            <strong>6 тем</strong> × <strong>5 вопросов</strong> (200, 400, 600, 800, 1000 баллов)
          </p>
        </div>

        <div className="confirmation-actions">
          <button 
            className="back-btn"
            onClick={handleBack}
          >
            ← Назад
          </button>
          <button 
            className="start-game-btn"
            onClick={handleStartGame}
          >
            Начать игру 🎮
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;