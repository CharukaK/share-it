export enum ELEMENT_TYPES {
    FREEDRAW = "freedraw"
}

export class Coordinate {
    x: number = 0;
    y: number = 0;
}

export class Diagram {
    elements: DiagramElement[] = []
}

export class DiagramElement {
    constructor(public type: string) {
    }
}

export class FreedrawElement extends DiagramElement {
    startX: number = 0;
    startY: number = 0;
    points: Coordinate[] = []
    strokeWidth: number = 0;
    color: string = "green"

    constructor() {
        super(ELEMENT_TYPES.FREEDRAW);
    }
}

