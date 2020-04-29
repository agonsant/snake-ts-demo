import { IBoard, IRenderContext, Point } from "./models/models";

export class Board<T extends IRenderContext> implements IBoard {

    private width: number;
    private height: number;
    private gridSize: number;
    private render: T;

    constructor(width: number, height: number, gridSize: number, render: T) {
        this.width = width;
        this.height = height;
        this.render = render;
        this.gridSize = gridSize;
    }

    /**
     * get random whole numbers in a specific range
     * @see https://stackoverflow.com/a/1527820/2124254
     * */
    private getRandomInt(min: number, max: number) : number {
      return Math.floor(Math.random() * (max - min)) + min;
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

    generateRandomPosition() :Point {
        return {
            x: this.getRandomInt(0, this.width/this.gridSize) * this.gridSize,
            y: this.getRandomInt(0, this.height/this.gridSize) * this.gridSize
        }
    }

}