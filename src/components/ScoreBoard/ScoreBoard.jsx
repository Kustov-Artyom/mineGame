import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const { teams, scores, updateScore } = useGame();
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const sortedTeams = [...teams].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  const handleEditClick = (teamId, currentScore) => {
    setEditingTeamId(teamId);
    setEditValue(String(currentScore));
  };

  const handleSave = (teamId) => {
    const newScore = parseInt(editValue, 10);
    if (!isNaN(newScore)) {
      const currentScore = scores[teamId] || 0;
      const difference = newScore - currentScore;
      if (difference !== 0) {
        updateScore(teamId, difference);
      }
    }
    setEditingTeamId(null);
    setEditValue('');
  };

  const handleKeyDown = (e, teamId) => {
    if (e.key === 'Enter') {
      handleSave(teamId);
    } else if (e.key === 'Escape') {
      setEditingTeamId(null);
      setEditValue('');
    }
  };

  const handleBlur = (teamId) => {
    handleSave(teamId);
  };

  return (
    <div className="scoreboard">
      <div className="scoreboard-container">
        <h2 className="scoreboard-title">Счёт</h2>
        <div className="teams-scores">
          {sortedTeams.map((team, index) => {
            const currentScore = scores[team.id] || 0;
            const isEditing = editingTeamId === team.id;

            return (
              <div key={team.id} className={`score-item ${index === 0 ? 'leader' : ''}`}>
                <div className="team-info">
                  <span className="team-rank">#{index + 1}</span>
                  <span className="team-name-score">{team.name}</span>
                </div>
                <div className="team-score-wrapper">
                  {isEditing ? (
                    <input
                      type="number"
                      className="score-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, team.id)}
                      onBlur={() => handleBlur(team.id)}
                      autoFocus
                    />
                  ) : (
                    <span className="team-score">{currentScore}</span>
                  )}
                  <button
                    className="edit-score-btn"
                    onClick={() => handleEditClick(team.id, currentScore)}
                    title="Редактировать счёт"
                  >
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;