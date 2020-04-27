import { Snake } from "./snake.js";


export class Board {

    private context: CanvasRenderingContext2D | null;

    constructor(private canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
    }

    draw(snake: Snake, grid: number): void {
        this.clear();
        if (this.context) this.context.fillStyle = 'green';
        snake.getCells().forEach(c => {
            this.context?.fillRect(c.x, c.y, grid - 1, grid - 1);
        });

    }

    clear(): void {
        this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}