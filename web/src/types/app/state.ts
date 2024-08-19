import { Coordinate, Diagram } from "../diagram/diagram";

export enum MouseButton {
    PRIMARY = 1,
    Secondary,
}

export type ToolEntry = {
    entry: string;
    icon: string;
};

export enum DiagramElement {
    FREEDRAW = 'freedraw',
    RECTANGLE = 'rectangle',
}

export const toolEntries: ToolEntry[] = [
    { entry: DiagramElement.FREEDRAW, icon: 'ri-pencil-line' },
    { entry: DiagramElement.RECTANGLE, icon: 'ri-square-line' },
];

export type AppState = {
    diagram: Diagram;
    selectedTool: DiagramElement | undefined;
    startPoint: Coordinate | undefined;
    draft: DiagramElement | undefined;
};

export enum AppEventType {
    TOOL_CHANGE,
    START_DRAW,
    STOP_DRAW,
}

export type AppEvent = { type: AppEventType.TOOL_CHANGE, tool: DiagramElement | undefined }
    | { type: AppEventType.START_DRAW }

