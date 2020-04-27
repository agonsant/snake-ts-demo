import { Board } from "./board.js";
import { Snake } from "./snake.js";

export class Game {

    private board: Board;
    private snake: Snake;
    private static grid: number = 16;

    constructor() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game');
        this.board = new Board(canvas);
        this.snake = new Snake({ dx: Game.grid, dy: 0 }, { x: 160, y: 160 }, 4);
    }

    start() {
        requestAnimationFrame(this.start.bind(this));
        this.snake.move();
        this.board.draw(this.snake, Game.grid);
    }
}