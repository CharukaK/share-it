import { Coordinate, DiagramElement, DiagramElementType } from "../diagram";

export class FreedrawElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    points: Coordinate[] = []
    strokeWidth: number = 0;
    color: string = "green"
    type: string = DiagramElementType.FREEDRAW;

    constructor() {
    }

    render(ctx: CanvasRenderingContext2D) {
        throw new Error("Method not implemented.");
    }

    nextPoint(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
}
