export type ToolEntry = {
    entry: string;
    icon: string;
};

export enum DIAGRAM_MODE {
    MOVE,
    TOOL
}

export type AppState = {
    mode: DIAGRAM_MODE
};
