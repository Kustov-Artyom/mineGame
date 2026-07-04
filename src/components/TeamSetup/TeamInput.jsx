import { useState } from 'react';
import './TeamSetup.css';

const TeamInput = ({ team, onUpdate, onRemove, canRemove }) => {
  const [value, setValue] = useState(team.name);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onUpdate(team.id, newValue);
  };

  return (
    <div className="team-input-wrapper">
      <input
        type="text"
        className="team-input"
        value={value}
        onChange={handleChange}
        placeholder={`Команда ${team.id}`}
        maxLength={30}
      />
      {canRemove && (
        <button 
          className="remove-team-btn"
          onClick={() => onRemove(team.id)}
          aria-label="Удалить команду"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TeamInput;