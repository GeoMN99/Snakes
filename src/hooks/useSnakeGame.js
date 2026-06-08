import { useState, useEffect, useRef, use, useCallback } from 'react';

export const GRID_SIZE = 20
const INITIAL_SPEED = 150
const MIN_SPEED = 60
const SPEED_INCREMENT = 5

const getIntitalSnake = () => [
    { x:10, y:10 },
    { x:9, y:10 },
    { x:8, y:10 },
]

const getRandomFood = (snake) => {
    let food
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        }
    } while (snake.some(seg => seg.x === food.x && seg.y === food.y))
        return food
}

export function useSnakeGame() {
    const [snake, setSnake] = useState(getInitialSnake)
    const [food, setFood] = useState({ x:15, y:10 })
    const [score, setScore] = useState(0)
    const [highscore, setHighScore] =useState(
        () => parseInt(localStorage.getItem('snakeHighScore') || '0')
    )
    const [gameState, setGameState] = useState('idle')

    const dirRef =useRef({ x:1, y:0 })
    const nextDirRef =useRef({ x:1, y:0 })
    const snakeRef = useRef(getInitialSnake())
    const foodRef = useRef({ x:15, y:10 })
    const scoreRef = useRef(0)

    const speed = Math.max(MIN_SPEED, INITIAL_SPEED - score * SPEED_INCREMENT)
    const startGame = useCallback(() => {
        const s = getInitialSnake()
        const f = getRandomFood(s)
        snakeRef.current = s
        foodRef.current = f
        scoreRef.current = 0
        dirRef.current = { x:1, y:0 }
        nextDirRef.current = { x:1, y:0 }
        setSnake(s)
        setFood(f)
        setScore(0)
        setGameState('playing')
    }, [])
}