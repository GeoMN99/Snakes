import { useMemo } from "react";
import { GRID_SIZE } from "../hooks/useSnakeGame";

function GameBoard({ snake, food }) {
    const snakePositions = useMemo(() => {
        return new Set(snake.map(seg => `${snake[0].x},${snake[0].y}`))
    }, [snake])

    const headKey = `${snake[0].x},${snake[0].y}`


}