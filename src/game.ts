import { Board } from "./board.js";
import { Snake } from "./snake.js";
import { Point, IRenderContext } from "./models/models.js";
import { CanvasRenderContext } from "./canvas-render-context.js";

export class Game {

    private board: Board;
    private snake: Snake;
    private static grid: number = 10;
    private frameCount: number;
    private gameOver: boolean;
    private renderContext: IRenderContext;

    constructor() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game');
        this.renderContext = new CanvasRenderContext(canvas, Game.grid);
        this.board = new Board(canvas);
        this.snake = new Snake<CanvasRenderContext>({ dx: Game.grid, dy: 0 }, { x: 160, y: 160 }, 4, <CanvasRenderContext>this.renderContext);
        this.frameCount = 0;
        this.gameOver = false;
        this.registerActions();
    }

    /**
     * Add The listeners for moving the snake
     */
    private registerActions(): void {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            // prevent snake from backtracking on itself by checking that it's 
            // not already moving on the same axis (pressing left while moving
            // left won't do anything, and pressing right while moving left
            // shouldn't let you collide with your own body)
            const snakeDirection = this.snake.getDirection();
            if (e.which === 37 && snakeDirection.dx === 0) { // left arrow key
                this.snake.changeDirection({ dx: -Game.grid, dy: 0 });
            } else if (e.which === 38 && snakeDirection.dy === 0) { // up arrow key
                this.snake.changeDirection({ dx: 0, dy: -Game.grid });
            } else if (e.which === 39 && snakeDirection.dx === 0) { // right arrow key
                this.snake.changeDirection({ dx: Game.grid, dy: 0 });
            } else if (e.which === 40 && snakeDirection.dy === 0) { // down arrow key
                this.snake.changeDirection({ dx: 0, dy: Game.grid });
            }
        });
    }

    /**
     * There is a Snake collision if one the head is in the same position as 
     * other different cell
     */
    private isSnakeCollision(): boolean {
        const snakeCells: Point[] = this.snake.getCells();
        return snakeCells.some((c: Point, i: number) => {
            return i > 0 && c.x === snakeCells[0].x && c.y === snakeCells[0].y;
        });
    }

    /**
     * Main Game Loop:
     *   Requests a new Frame
     *   Moves the Snake
     *   Draws 
     *   Check Game Over
     */
    start() {
        if (!this.gameOver) {
            requestAnimationFrame(this.start.bind(this));
            if (++this.frameCount < 6) return;
            this.frameCount = 0;
            this.snake.move(this.board.getHeight(), this.board.getWidth(), Game.grid);
            this.board.draw(this.snake, Game.grid);
            this.gameOver = this.isSnakeCollision();
        } else {
            this.board.gameOver();
        }
    }
}