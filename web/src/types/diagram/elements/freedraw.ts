import { Coordinate, DiagramElement, DiagramElementType } from "../diagram";

export class FreedrawElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    endX: number = 0;
    endY: number = 0;
    points: Coordinate[] = []
    strokeWidth: number = 0;
    color: string = "green"
    type: string = DiagramElementType.FREEDRAW;

    render(ctx: CanvasRenderingContext2D) {
        console.log(ctx);
    }

    nextPoint(x: number, y: number): void {
        console.log(x, y);
    }
}
