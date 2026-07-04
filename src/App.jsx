import { useGame } from './context/GameContext';
import TeamSetup from './components/TeamSetup/TeamSetup';
import ConfirmationScreen from './components/ConfirmationScreen/ConfirmationScreen';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  const { currentScreen } = useGame();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'setup':
        return <TeamSetup />;
      case 'confirmation':
        return <ConfirmationScreen />;
      case 'game':
        return <GameBoard />;
      default:
        return <TeamSetup />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;