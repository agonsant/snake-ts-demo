import { IRenderContext, Point } from "./models/models";


export class CanvasRenderContext implements IRenderContext {

    private context: CanvasRenderingContext2D | null;
    private height: number;
    private width: number;
    private gridSize: number;

    constructor(canvas: HTMLCanvasElement, gridSize: number) {
        this.context = canvas.getContext("2d");
        this.height = canvas.height;
        this.width = canvas.width;
        this.gridSize = gridSize;
    }

    drawSnake(cells: Point[], color: string): void {
        if (this.context) this.context.fillStyle = color;
        cells.forEach(c => {
            this.context?.fillRect(c.x, c.y, this.gridSize - 1, this.gridSize - 1);
        })
    }

    drawBoard(): void {
        throw new Error("Method not implemented.");
    }

}