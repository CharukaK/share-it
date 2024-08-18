import { AppEvent, AppEventType, AppState, toolEntries, TOOL } from './types/app/state'
import './style.css';
import { Diagram } from './types/diagram/diagram';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');
const toolbox = document.querySelector<HTMLDivElement>('.tool-box')

// register toolbox events
if (toolbox) {
    const listener = (e: MouseEvent) => {
        e.preventDefault();
        if ((e.target as Element).classList.contains(TOOL.FREEDRAW)) {
            fireEvent({ type: AppEventType.TOOL_CHANGE, tool: TOOL.FREEDRAW })
        } else if ((e.target as Element).classList.contains(TOOL.ERASER)) {
            fireEvent({ type: AppEventType.TOOL_CHANGE, tool: TOOL.ERASER })
        }
    }
    toolbox.addEventListener('click', listener);
}

// register document events
document.addEventListener('keyup', (e: KeyboardEvent) => {
    switch (e.key) {
        case "Escape":
            fireEvent({type: AppEventType.TOOL_CHANGE, tool: undefined})
            break;
    }
});

// const ctx = canvas?.getContext('2d');

let appState: AppState = {
    diagram: new Diagram(),
    selectedTool: undefined,
}

const reducer = (prev: AppState, evt: AppEvent): AppState => {
    switch (evt.type) {
        case AppEventType.TOOL_CHANGE:
            prev.selectedTool = evt.tool;
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

