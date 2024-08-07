/** @enum {string} */
const DIAGRAM_MODE = Object.freeze({
    MOVE: 'move',
    DRAW: 'draw'
});

/** @enum {string} */
const ELEMENT_TYPE = Object.freeze({
    LINE: 'line',
    FREEDRAW: 'freedraw',
})

class AppState {
    constructor() {
        this.drawMode = DIAGRAM_MODE.MOVE;
    }
}

class Coordinate {
    constructor(x, y) {
        /** @property {number} */
        this.x = x;
        /** @property {number} */
        this.y = y;
    }
}

class DiagramElement {
    /**
     * @param {ELEMENT_TYPE} type 
     * */
    constructor(type) {
        this.type = type
    }
}

class FreedrawElement extends DiagramElement {
    constructor() {
        /** @property {number} */
        this.startX = 0;
        /** @property {number} */
        this.startY = 0;
        /** @property {Coordinate[]} */
        this.points = []
    }
}

const fel = new FreedrawElement()

const PRIMARY_MOUSE_BTN = 1

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var lastPosition = undefined;

function init() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // // Draw yellow background
    // ctx.beginPath();
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

}

function resize() {
    // const data = ctx.getImageData()
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // ctx.putImageData(data, 0, 0, 0, 0, window.innerWidth, window.innerHeight)
};

/**
 * Handle mouse movement
 * @param {MouseEvent} e 
 * */
function mouseMove(e) {
    if (e.buttons == PRIMARY_MOUSE_BTN) {
        if (!lastPosition) {
            lastPosition = { x: e.offsetX, y: e.offsetY };
            return;
        }

        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.stroke();
        lastPosition = { x: e.offsetX, y: e.offsetY };
    }
}

function mouseButtonRelease() {
    lastPosition = undefined;
    ctx.save()
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', mouseMove)
window.addEventListener('mouseup', mouseButtonRelease)

init();

