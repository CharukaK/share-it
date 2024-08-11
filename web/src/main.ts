import { ToolEntry } from './types/app/state'
import './style.css';

const canvas = document.querySelector('canvas');
const toolbox = document.querySelector('.tool-box')
// const ctx = canvas?.getContext('2d');

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

    const tools: ToolEntry[] = [
        { entry: 'hand', icon: 'ri-hand' },
        { entry: 'freedraw', icon: 'ri-pencil-line' },
        { entry: 'eraser', icon: 'ri-eraser-fill' }
    ];

    let innerHtml = '';

    for (let tool of tools) {
        innerHtml += `
            <div>
                <i class="${tool.entry} ${tool.icon}"></i>
            </div>
        `
    }

    if (toolbox) {
        toolbox.innerHTML = innerHtml
    }

}

renderToolBox()

