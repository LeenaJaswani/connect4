import logo from './logo.svg';
import './App.css';
import GameBoard from './Components/GameBoard';

function App() {
  return (
    <div className="App">
    
      <GameBoard/>
      <h1> 
                  Connect 4 circles to win the game
                </h1>
    </div>
  );
}

export default App;
