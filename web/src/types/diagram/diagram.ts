export class Coordinate {
    x: number = 0;
    y: number = 0;
}

export enum DiagramElementType {
    FREEDRAW = 'freedraw',
    RECTANGLE = 'rectangle',
}

export class Diagram {
    elements: DiagramElement[] = []
}

export interface DiagramElement {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    type: string;
    render(ctx: CanvasRenderingContext2D): void;
    nextPoint(x: number, y: number): void;
}




