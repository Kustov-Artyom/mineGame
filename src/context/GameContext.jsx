import { createContext, useContext, useState } from 'react';
import { categories } from '../data/questions';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('setup');
  const [scores, setScores] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const addTeam = (teamName) => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
    };
    setTeams([...teams, newTeam]);
    setScores({ ...scores, [newTeam.id]: 0 });
  };

  const removeTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
    const newScores = { ...scores };
    delete newScores[teamId];
    setScores(newScores);
  };

  const updateTeamName = (teamId, newName) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, name: newName } : team
    ));
  };

  const updateScore = (teamId, points) => {
    setScores(prev => ({
      ...prev,
      [teamId]: (prev[teamId] || 0) + points
    }));
  };

  const markQuestionAnswered = (categoryId, questionIndex) => {
    setAnsweredQuestions([...answeredQuestions, `${categoryId}-${questionIndex}`]);
  };

  const isQuestionAnswered = (categoryId, questionIndex) => {
    return answeredQuestions.includes(`${categoryId}-${questionIndex}`);
  };

  const openQuestion = (categoryId, questionIndex) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.questions[questionIndex]) {
      const questionData = category.questions[questionIndex];
      
      setCurrentQuestion({
        categoryId,
        questionIndex,
        question: questionData.question,
        answer: questionData.answer,
        points: questionData.points,
        image: questionData.image || null,
        categoryName: category.name
      });
    }
  };

  const closeQuestion = () => {
    setCurrentQuestion(null);
  };

  const resetGame = () => {
    setTeams([]);
    setScores({});
    setAnsweredQuestions([]);
    setCurrentQuestion(null);
    setCurrentScreen('setup');
  };

  const value = {
    teams,
    scores,
    currentScreen,
    setCurrentScreen,
    addTeam,
    removeTeam,
    updateTeamName,
    updateScore,
    answeredQuestions,
    markQuestionAnswered,
    isQuestionAnswered,
    currentQuestion,
    openQuestion,
    closeQuestion,
    resetGame,
    categories,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};