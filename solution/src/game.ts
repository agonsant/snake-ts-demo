import { Board } from "./board.js";
import { Snake } from "./snake.js";
import { Point, IRenderContext, IBoard, ISnake, IDrawable, IFood } from "./models/models.js";
import { CanvasRenderContext } from "./canvas-render-context.js";
import { Food } from "./food.js";
// import { DivContextRender } from "./div-render-context.js";

export class Game {

    private board: IBoard;
    private snake: ISnake;
    private static grid: number = 10;
    private frameCount: number;
    private gameOver: boolean;
    private render: IRenderContext
    private drawableElements: IDrawable[];

    constructor() {
        const width = 250;
        const height = 250;
        this.render = new CanvasRenderContext('game', 250, 250, Game.grid);
        // this.render = new DivContextRender('game', 250, 250, Game.grid);
        this.board = new Board<CanvasRenderContext>(width, height, Game.grid, <CanvasRenderContext>this.render);
        this.snake = new Snake<CanvasRenderContext>({ dx: Game.grid, dy: 0 }, { x: 160, y: 160 }, 4, <CanvasRenderContext>this.render);
        this.drawableElements = [this.board, this.snake];
        this.frameCount = 0;
        this.gameOver = false;
        this.registerActions();
        this.drawableElements.push(this.generateNewFood());
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
     * Check if there is a Food Collision
     */
    private checkFoodCollision(): void {
        const snakeHead: Point = this.snake.getCells()[0];
        for (let i = 0; i < this.drawableElements.length; i++) {
            const e = this.drawableElements[i];
            if (e instanceof Food && e.getPosition().x === snakeHead.x
                && e.getPosition().y === snakeHead.y) {
                this.drawableElements[i] = this.generateNewFood();
                this.snake.feed();
            }
        }
    }

    private generateNewFood(): IFood {
        return new Food(this.board.generateRandomPosition(), this.render);
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
            this.render.clear();
            this.snake.move(this.board);
            this.checkFoodCollision();
            this.drawableElements.forEach(e => e.draw());
            this.gameOver = this.isSnakeCollision();
        } else {
            this.render.drawGameOver();
        }
    }
}