import './style.css'

console.log('haha')

const canvas = document.querySelector('canvas')
const ctx = canvas?.getContext('2d')

function init() {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
}

function onResize() {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
}

window.addEventListener('resize', onResize);
init();

