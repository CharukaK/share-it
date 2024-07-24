/**
 * @typedef {Object} State
 * @property {boolean} drawing whether the app is in drawing mode
 * @property {boolean} moving whether the app is in moving mode
 * */

const PRIMARY_MOUSE_BTN = 1

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function init() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function resize() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
};

/**
 * Handle mouse movement
 * @param {MouseEvent} e 
 * */
function mouseMove(e) {
    if (e.buttons == PRIMARY_MOUSE_BTN) {
        console.log("haah")
        context.fillStyle = 'green';
        context.beginPath();
        context.arc(e.x, e.y, 0, 0, 0)
    }
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', mouseMove)

init();

