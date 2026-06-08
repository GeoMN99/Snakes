import { useSnakeGame } from './hooks/useSnakeGame'
import GameBoard from './components/GameBoard'
import './App.css'

function App() {
  const { snake, food, score, highScore, gameStats, startGame } = useSnakeGame()
}