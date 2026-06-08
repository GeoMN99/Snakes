import { useMemo } from "react";
import { GRID_SIZE } from "../hooks/useSnakeGame";

function GameBoard({ snake, food }) {
    const snakePositions = useMemo(() => {
        return new Set(snake.map(seg => `${seg.x},${seg.y}`))
    }, [snake])

    const headKey = `${snake[0].x},${snake[0].y}`

    const cells = []
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++){
            const key = `${x},${y}`
            let className = 'cell'
            if (key === headKey) className = 'cell snake-head'
            else if (snakePositions.has(key)) className = 'cell snake-body'
            else if (x === food.x && y === food.y) className = 'cell food'
            cells.push(<div key={key} className={className} />)
        }
    }

    return <div className="game-board">{cells}</div>
}

export default GameBoard