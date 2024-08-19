import { DiagramElement, DiagramElementType } from "../diagram";

export class RectangleElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    endX: number = 0;
    endY: number = 0;
    type: string = DiagramElementType.RECTANGLE;


    render(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.rect(this.startX, this.startY, this.endX - this.startX, this.endY - this.startY)
        ctx.stroke();
    }

    nextPoint(x: number, y: number): void {
        this.endX = x;
        this.endY = y;
    }
}
