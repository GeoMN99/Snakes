import { useRef } from 'react'
import { useSnakeGame } from './hooks/useSnakeGame'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const { snake, food, score, highScore, gameState, startGame, changeDirection } = useSnakeGame()

  const touchStartRef = useRef(null)

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    const SWIPE_THRESHOLD = 30
    if (Math.max(absDx, absDy) < SWIPE_THRESHOLD) {
      touchStartRef.current = null
      return
    }

    if (gameState !== 'playing') {
      startGame()
      touchStartRef.current = null
      return
    }

    if (absDx > absDy) {
      changeDirection({ x: dx > 0 ? 1 : -1, y: 0 })
    } else {
      changeDirection({ x: 0, y: dy > 0 ? 1 : -1 })
    }

    touchStartRef.current = null
  }

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

      <div
        className="board-wrapper"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <GameBoard snake={snake} food={food} />

        {gameState !== 'playing' && (
          <div className="overlay">
            {gameState === 'idle' && (
              <>
                <h2>Snake</h2>
                <p>Arrow keys or WASD to move</p>
                <button onClick={startGame}>Start Game</button>
                <p className="hint">or press Enter / Space / Swipe</p>
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
                <p className="hint">or press Enter / Space / Swipe</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App