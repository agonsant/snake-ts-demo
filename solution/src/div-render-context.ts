import { IRenderContext, Point } from "./models/models";

export class DivContextRender implements IRenderContext {

    private context: HTMLDivElement[][];
    private width: number;
    private height: number;
    private gridSize: number;
    private columns: number;
    private rows: number;

    constructor(containerID: string, width: number, height: number, gridSize: number) {
        if (!document || !window) throw new Error('No se ha detectado un Navegador, No se puede renderizar el contexto');
        this.width = width;
        this.height = height;
        this.gridSize = gridSize;
        this.columns = width / gridSize;
        this.rows = height / gridSize;
        this.context = [];
        const container = document.getElementById(containerID);
        if (!container) throw new Error('No se ha encontrado el elemento del DOM contenedor');
        container.style.width = `${width}px`;
        container.style.height = `${height}px`;
        container.style.margin = `auto`;
        container.appendChild(this.generateHTMLContext());
    }

    private generateHTMLContext(): DocumentFragment {
        const docFragment = document.createDocumentFragment();
        for (let y = 0; y < this.rows; ++y) {
            let row = [];
            for (let x = 0; x < this.columns; ++x) {
                let cell = document.createElement('div');
                cell.style.width = `${this.gridSize}px`;
                cell.style.height = `${this.gridSize}px`;
                cell.style.border = '1px solid black';
                cell.style.boxSizing = 'border-box';
                cell.style.float = 'left';
                cell.style.position = 'relative';
                docFragment.appendChild(cell);
                row.push(cell);
            }
            this.context.push(row);
        }
        return docFragment;
    }

    drawSnakeCell(cells: Point[], color: string): void {
        cells.forEach(c => {
            const row = c.y/this.gridSize;
            const column = c.x/this.gridSize;
            this.context[row][column].style.backgroundColor = color;
        });
    }

    drawFood(): void {
        throw new Error("Method not implemented.");
    }

    drawBoard(): void {
    }

    drawGameOver(): void {
        throw new Error("Method not implemented.");
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    clear(): void {
        this.context.forEach(r => {
            r.forEach(c => c.style.backgroundColor = '');
        })
    }
}