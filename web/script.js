/**
 * @typedef {Object} State
 * @property {boolean} drawing whether the app is in drawing mode
 * @property {boolean} moving whether the app is in moving mode
 * */

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

