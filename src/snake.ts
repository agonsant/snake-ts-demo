import { Point, Vector } from "./models/models";


export class Snake {

    private head: Point;
    private velocity: Vector;
    private body: Point[];

    constructor(initialVelocity: Vector, initialPosition: Point, initialLength: number) {
        this.velocity = initialVelocity;
        this.head = initialPosition;
        this.body = [];
        let x: number = initialPosition.x - initialVelocity.dx;
        let y: number = initialPosition.y - initialVelocity.dy;
        for (let i = 0; i < initialLength - 1; i++) {
            this.body.push({ x: x, y: y });
            y -= initialVelocity.dy;
            x -= initialVelocity.dx;
        }
    }

    private calculateLimitPosition(maxHeight: number, maxWidth: number, grid: number): Partial<Point> {
        const limitPosition: Partial<Point> = {};
        // wrap snake position horizontally on edge of the board
        if (this.head.x < 0) {
            limitPosition.x = maxWidth - grid;
        } else if (this.head.x >= maxWidth) {
            limitPosition.x = 0;
        }

        // wrap snake position vertically on edge of the board
        if (this.head.y < 0) {
            limitPosition.y = maxHeight - grid;
        } else if (this.head.y >= maxHeight) {
            limitPosition.y = 0;
        }
        return limitPosition;
    }

    /**
     * Moves the Snake One position removing the last cell and creating a new head
     */
    move(maxHeight: number, maxWidth: number, grid: number): void {
        this.body.unshift({ x: this.head.x, y: this.head.y });
        this.body.pop();
        this.head.x += this.velocity.dx;
        this.head.y += this.velocity.dy;
        this.head = { ...this.head, ...this.calculateLimitPosition(maxHeight, maxWidth, grid) };
    }

    /**
     * Retrieves the whole snake cells
     */
    getCells(): Point[] {
        return [this.head, ...this.body];
    }

    /**
     * Retrieves the Snake direction Vector
     */
    getDirection(): Vector {
        return this.velocity;
    }

    /**
     * Changes the Snake direction
     * @param newDirection the new Snake direction
     */
    changeDirection(newDirection: Vector): void {
        this.velocity = newDirection;
    }
}