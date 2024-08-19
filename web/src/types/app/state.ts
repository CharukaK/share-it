import { Coordinate, Diagram, DiagramElement, DiagramElementType } from "../diagram/diagram";

export enum MouseButton {
    PRIMARY = 1,
    Secondary,
}

export type ToolEntry = {
    entry: string;
    icon: string;
};

export const toolEntries: ToolEntry[] = [
    { entry: DiagramElementType.FREEDRAW, icon: 'ri-pencil-line' },
    { entry: DiagramElementType.RECTANGLE, icon: 'ri-square-line' },
];

export type AppState = {
    diagram: Diagram;
    selectedTool: DiagramElementType | undefined;
    startPoint: Coordinate | undefined;
    draft: DiagramElement | undefined;
};

export enum AppEventType {
    TOOL_CHANGE,
    START_DRAW,
    MOVE_NEXT_POINT,
    STOP_DRAW,
}

export type AppEvent = { type: AppEventType.TOOL_CHANGE, tool: DiagramElementType | undefined }
    | { type: AppEventType.START_DRAW, point: Coordinate }
    | { type: AppEventType.MOVE_NEXT_POINT, point: Coordinate }
    | { type: AppEventType.STOP_DRAW }

