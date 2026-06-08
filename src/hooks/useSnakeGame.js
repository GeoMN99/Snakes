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

    // Game loop
    useEffect(() => {
        if (gameState !== 'playing') return

        const interval = setInterval(() => {
            dirRef.current = nextDirRef.current
            const dir =dirRef.current
            const currentSnake = snakeRef.current
            const head =currentSnake[0]
            const newHead = { x: head.x + dir.x, y: head.y + dir.y }

            // Wall collision
            if (
                newHead.x < 0 || newHead.x >= GRID_SIZE ||
                newHead.y < 0 || newHead.y >= GRID_SIZE
            ) {
                const final =scoreRef.current
                setHighScore(prev => {
                    const updated = Math.max(prev, final)
                    localStorage.setItem('snakeHighScore', String(updated))
                    return updated
                })
                setGameState('gameover')
                return
            }

            // Self collision
            if (currentSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
                const final = scoreRef.current
                setHighScore(prev => {
                    const updated = Math.max(prev, final)
                    localStorage.setItem('snakeHighScore', String(updated))
                    return updated
                })
                setGameState('gameover')
                return
            }

            const ateFood =
              newHead.x === foodRef.current.x && newHead.y === foodRef.current.y

            if (ateFood) {
                const newSnake = [newHead, ...currentSnake]
                const newFood = getRandomFood(newSnake)
                const newScore = scoreRef.current + 1
                snakeRef.current = newSnake
                foodRef.current = newFood
                scoreRef.current = newScore
                setSnake(newSnake)
                setFood(newFood)
                setScore(newScore)
            }   else {
                const newSnake = [newHead, ...currentSnake.slice(0, -1)]
                snakeRef.current = newSnake
                setSnake(newSnake)
                }
            }, speed)

            return () => clearInterval(interval)
        }, [gameState, speed])
    })
}