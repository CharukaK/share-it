import { SHAPE as ElementType } from '../app/state'
export class Coordinate {
    x: number = 0;
    y: number = 0;
}

export class Diagram {
    elements: DiagramElement[] = []
}

export interface DiagramElement {
    startX: number;
    startY: number;
    type: string;
    render(ctx: CanvasRenderingContext2D): void;
}

export class FreedrawElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    points: Coordinate[] = []
    strokeWidth: number = 0;
    color: string = "green"
    type: string = ElementType.FREEDRAW;

    constructor() {
    }

    render(ctx: CanvasRenderingContext2D) {
        throw new Error("Method not implemented.");
    }
}

export class RectangleElement implements DiagramElement {
    startX: number = 0;
    startY: number = 0;
    type: string = ElementType.RECTANGLE;


    render(ctx: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }

}


