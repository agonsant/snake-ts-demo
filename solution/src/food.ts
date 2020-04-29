import { IDrawable, IRenderContext, Point } from "./models/models";

export class Food<T extends IRenderContext> implements IDrawable {

    private renderContext: T;
    private position: Point;

    constructor(position: Point, renderContext: T) {
        this.renderContext = renderContext
        this.position = position;
    }

    draw(): void {
        this.renderContext.drawFood(this.position, 'red');
    }

    getPosition(): Point {
        return this.position;
    }
}