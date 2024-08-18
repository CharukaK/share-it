import { Diagram } from "../diagram/diagram";

export type ToolEntry = {
    entry: string;
    icon: string;
};

export enum TOOL {
    FREEDRAW = 'freedraw',
    ERASER = 'eraser'
}


export const toolEntries: ToolEntry[] = [
    { entry: TOOL.FREEDRAW, icon: 'ri-pencil-line' },
    { entry: TOOL.ERASER, icon: 'ri-eraser-fill' }
];

export type AppState = {
    diagram: Diagram
    selectedTool: TOOL | undefined
};

export enum AppEventType {
    TOOL_CHANGE
}

export type AppEvent = { type: AppEventType.TOOL_CHANGE, tool: TOOL | undefined }

