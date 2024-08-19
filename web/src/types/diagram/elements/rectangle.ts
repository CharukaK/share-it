import { DiagramElement, DiagramElementType } from "../diagram";

export class RectangleElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    endX: number = 0;
    endY: number = 0;
    type: string = DiagramElementType.RECTANGLE;


    render(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }

    nextPoint(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
}
