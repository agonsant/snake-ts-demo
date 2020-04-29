export type Point = {
    x: number,
    y: number
}

export type Vector = {
    dx: number,
    dy: number
}


export interface IDrawable {
    draw(): void;
}

export interface IBoard extends IDrawable {
    getWidth(): number;
    getHeight(): number;
    getGridSize(): number;
}

export interface ISnake extends IDrawable {
    getCells(): Point[];
    move(board: IBoard): void;
    changeDirection(newDirection: Vector): void;
    getDirection(): Vector;
}

export interface IRenderContext {
    drawSnakeCell(cells: Point[], color: string): void;
    drawFood(position: Point, color: string): void;
    drawBoard(width: number, height: number): void;
    drawGameOver(): void;
    getWidth(): number;
    getHeight(): number;
    clear(): void;
}
