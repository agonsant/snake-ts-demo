import { IRenderContext, Point } from "./models/models";


export class CanvasRenderContext implements IRenderContext {

    private context: CanvasRenderingContext2D | null;
    private width: number;
    private height: number;
    private gridSize: number;

    constructor(canvas: HTMLCanvasElement, gridSize: number) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.gridSize = gridSize;
    }

    drawSnakeCell(cells: Point[], color: string): void {
        if (this.context) this.context.fillStyle = color;
        cells.forEach(c => {
            this.context?.fillRect(c.x, c.y, this.gridSize - 1, this.gridSize - 1);
        });
    }

    drawFood(position: Point, color: string): void {
        throw new Error("Method not implemented." + position + color);
    }

    drawBoard(): void {
        
    }

    drawGameOver(): void {
        if (this.context) {
            this.context.font = "40px Tahoma";
            this.context.textAlign = "center";
            this.context.textBaseline = "middle";
            this.context.fillStyle = "White";
            this.context.fillText("GAME OVER", this.width / 2, this.height / 2);
        }
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    clear(): void {
        this.context?.clearRect(0, 0, this.width, this.height);
    }

}