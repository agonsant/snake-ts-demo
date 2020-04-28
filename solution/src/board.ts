import { Snake } from "./snake.js";


export class Board {

    private context: CanvasRenderingContext2D | null;

    constructor(private canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
    }

    /**
     * Draws the whole game scene
     * @param snake the snake to draw
     * @param grid the scene grid size
     */
    draw(snake: Snake, grid: number): void {
        this.clear();
        if (this.context) this.context.fillStyle = 'green';
        snake.getCells().forEach(c => {
            this.context?.fillRect(c.x, c.y, grid - 1, grid - 1);
        });

    }

    /**
     * clears the board
     */
    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Prints Game Over in the board
     */
    gameOver(): void {
        if (this.context) {
            this.context.font = "40px Tahoma";
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillStyle = "White";
            this.context.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2);
        }
    }

    getHeight(){
        return this.canvas.height;
    }

    getWidth(){
        return this.canvas.width;
    }

}