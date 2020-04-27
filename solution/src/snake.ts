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

    move(): void {
        this.body.unshift({ x: this.head.x, y: this.head.y });
        this.body.pop();
        this.head.x += this.velocity.dx;
        this.head.y += this.velocity.dy;
    }

    getCells(): Point[] {
        return [this.head, ...this.body];
    }
}