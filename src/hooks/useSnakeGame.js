import { useState, useEffect, useRef } from 'react';

export const GRID_SIZE = 20
const INITIAL_SPEED = 150
const MIN_SPEED = 60
const SPEED_INCREMENT = 5

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
