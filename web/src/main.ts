import { AppEvent, AppEventType, AppState, toolEntries, MouseButton } from './types/app/state'
import './style.css';
import { Coordinate, Diagram, DiagramElementType } from './types/diagram/diagram';
import * as DiagramElements from './types/diagram/elements'

const canvas = document.querySelector<HTMLCanvasElement>('canvas');
const ctx = canvas?.getContext('2d')
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
            if (prev.selectedTool) {
                let Element = DiagramElements[prev.selectedTool]
                prev.draft = new Element();
                prev.draft.startX = evt.point.x;
                prev.draft.startY = evt.point.y;
            }
            break;
        case AppEventType.MOVE_NEXT_POINT:
            if (prev.draft) {
                prev.draft.nextPoint(evt.point.x, evt.point.y)
            }
            break;
        case AppEventType.STOP_DRAW:
            if (prev.draft) {
                prev.diagram.elements.push(prev.draft)
                prev.draft = undefined;
            }
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
        render();
    }
});

window.addEventListener('mousemove', (e: MouseEvent) => {
    if (e.buttons === MouseButton.PRIMARY) {
    }

    switch (e.buttons) {
        case 1:
            if (!appState.draft) {
                const point = new Coordinate();
                point.x = e.x
                point.y = e.y
                fireEvent({ type: AppEventType.START_DRAW, point });
                return
            }

            const point = new Coordinate();
            point.x = e.offsetX;
            point.y = e.offsetY;
            fireEvent({ type: AppEventType.MOVE_NEXT_POINT, point });
            break
        default:
        // not required
    }
})

window.addEventListener('mouseup', () => {
    if (appState.draft) {
        fireEvent({ type: AppEventType.STOP_DRAW })
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
    if (ctx) {
        ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
        
        appState.diagram.elements.forEach(el => {
            el.render(ctx)
        });

        if (appState.draft) {
            appState.draft.render(ctx)
        }

    }
    renderToolBox();
}

render();

