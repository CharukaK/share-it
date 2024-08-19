import { AppEvent, AppEventType, AppState, toolEntries, DiagramElementType, MouseButton } from './types/app/state'
import './style.css';
import { Diagram } from './types/diagram/diagram';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');
const toolbox = document.querySelector<HTMLDivElement>('.tool-box')

// register toolbox events
if (toolbox) {
    const listener = (e: MouseEvent) => {
        e.preventDefault();
        if ((e.target as Element).classList.contains(DiagramElementType.FREEDRAW)) {
            fireEvent({ type: AppEventType.TOOL_CHANGE, tool: DiagramElementType.FREEDRAW })
        } else if ((e.target as Element).classList.contains(DiagramElementType.RECTANGLE)) {
            fireEvent({ type: AppEventType.TOOL_CHANGE, tool: DiagramElementType.RECTANGLE })
        }
    }
    toolbox.addEventListener('click', listener);
}

// register document events
document.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.key) {
        case "Escape":
            fireEvent({ type: AppEventType.TOOL_CHANGE, tool: undefined })
            break;
    }
});

// const ctx = canvas?.getContext('2d');

let appState: AppState = {
    diagram: new Diagram(),
    selectedTool: undefined,
    startPoint: undefined,
    draft: undefined
}

const reducer = (prev: AppState, evt: AppEvent): AppState => {
    switch (evt.type) {
        case AppEventType.TOOL_CHANGE:
            prev.selectedTool = evt.tool;
            break;
        case AppEventType.START_DRAW:

            break;
    }

    console.log(prev, evt)
    return prev
}

const fireEvent = (evt: AppEvent) => {
    appState = reducer(appState, evt);
    render()
}

if (canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

window.addEventListener('resize', () => {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
});

window.addEventListener('mousemove', (e: MouseEvent) => {
    console.log(e.buttons, MouseButton.PRIMARY)
    if (e.buttons === MouseButton.PRIMARY) {

    }
})


function renderToolBox() {
    let innerHtml = '';

    for (let tool of toolEntries) {
        const parentClasses = [tool.entry]

        if (appState.selectedTool && appState.selectedTool == tool.entry) {
            parentClasses.push('text-blue-400')
        }

        innerHtml += `
            <div class="${parentClasses.reduce((prev, curr) => `${prev} ${curr}`)}">
                <i class="${tool.entry} ${tool.icon}"></i>
            </div>
        `
    }

    if (toolbox) {
        toolbox.innerHTML = innerHtml
    }

}

function render() {
    renderToolBox();
}

render();

