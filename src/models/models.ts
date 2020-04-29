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

export interface ISnake extends IDrawable {
    move(board: IBoard): void;
    getCells(): Point[];
    changeDirection(newDirection: Vector): void;
    getDirection(): Vector;
}

export interface IBoard extends IDrawable {
    getWidth(): number;
    getHeight(): number;
    getGridSize(): number;
}


export interface IRenderContext {
    drawSnake(cells: Point[], color: string): void;
    drawBoard(): void;
}