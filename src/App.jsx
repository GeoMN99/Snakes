import { useSnakeGame } from './hooks/useSnakeGame'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const { snake, food, score, highScore, gameStats, startGame } = useSnakeGame()

  return (
    <div className="app">
      <h1>Snake</h1>

      <div className="scoreboard">
        <div className="score-item">
          <span className="score-label">Score</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Best</span>
          <span className="score-value">{highScore}</span>
        </div>
      </div>

      <div className="board-wrapper">
        <GameBoard snake={snake} food={food} />

        {gameState !== 'playing' && (
          <div className="overlay">
            {gameState === 'idle' && (
              <>
                <h2>Snake</h2>
                <p>Arrow keys or WASD to move</p>
                <button onClick={startGame}>Start Game</button>
                <p className="hint">or press Enter / Space</p>
              </>
            )}
            {gameState === 'gameover' && (
              <>
                <h2>Game Over</h2>
                <p className="final-score">Score: {score}</p>
                {score > 0 && score >= highScore && (
                  <p className="new-best">New Best!</p>
                )}
                <button onClick={startGame}>Play Again</button>
                <p className="hint">or press Enter / Space</p>
              </>
            )}
            </div>
        )}
      </div>
    </div>
  )
}

export default App