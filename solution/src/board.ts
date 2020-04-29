import { IBoard, IRenderContext } from "./models/models";

export class Board<T extends IRenderContext> implements IBoard {

    private width: number;
    private height: number;
    private gridSize: number;
    private render: T;

    constructor(width: number, height: number,gridSize: number, render: T) {
        this.width = width;
        this.height = height;
        this.render = render;
        this.gridSize = gridSize;
    }

    getGridSize(): number {
       return this.gridSize;
    }

    draw(): void {
        this.render.drawBoard(this.width, this.height);
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

}