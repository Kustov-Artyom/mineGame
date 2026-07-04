import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import TeamInput from './TeamInput';
import './TeamSetup.css';

const TeamSetup = () => {
  const { teams, addTeam, removeTeam, updateTeamName, setCurrentScreen } = useGame();
  const [error, setError] = useState('');

  // Инициализация с двумя командами по умолчанию
  if (teams.length === 0) {
    addTeam('Команда 1');
    addTeam('Команда 2');
  }

  const handleAddTeam = () => {
    const teamNumber = teams.length + 1;
    addTeam(`Команда ${teamNumber}`);
  };

  const handleContinue = () => {
    // Проверка что все команды имеют названия
    const hasEmptyTeams = teams.some(team => !team.name.trim());
    
    if (hasEmptyTeams) {
      setError('Пожалуйста, заполните названия всех команд');
      return;
    }

    setError('');
    setCurrentScreen('confirmation');
  };

  return (
    <div className="team-setup">
      <div className="team-setup-container">
        <h1 className="setup-title">Своя Игра</h1>
        <h2 className="setup-subtitle">Настройка команд</h2>
        
        <div className="teams-list">
          {teams.map((team, index) => (
            <TeamInput
              key={team.id}
              team={team}
              onUpdate={updateTeamName}
              onRemove={removeTeam}
              canRemove={teams.length > 2}
            />
          ))}
        </div>

        <button 
          className="add-team-btn"
          onClick={handleAddTeam}
        >
          <span className="plus-icon">+</span>
          Добавить команду
        </button>

        {error && <div className="error-message">{error}</div>}

        <button 
          className="continue-btn"
          onClick={handleContinue}
        >
          Готовы к игре
        </button>
      </div>
    </div>
  );
};

export default TeamSetup;