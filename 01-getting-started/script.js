// create and inject a canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
// append to container
const container = document.getElementById('canvas-app');
const element = document.createElement('p');
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
const getCanvasRelative = function(event) {
    const canvas = event.target;
    const bx = canvas.getBoundingClientRect();
    return {
        x: event.clientX - bx.left,
        y: event.clientY - bx.top,
        bx: bx
    };
};
// To globally have access to mouse position
const state = {
};
const draw = function(ctx, canvas, state) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = 'red';
    console.log(`canvas width: ${canvas.width} / 2 = ${canvas.width/2}, canvas height: ${canvas.height} / 2 = ${canvas.height/2}`);
    console.log(state.x, state.y);
    ctx.translate(state.x, state.y);
    ctx.fillRect(-16, -16, 32, 32);
    ctx.restore();
};
canvas.addEventListener('mousedown', function(event) {
    var pos = getCanvasRelative(event);
    event.preventDefault();
    state.x = pos.x;
    state.y = pos.y;
    draw(ctx, canvas, state);
});

canvas.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('mousedown', event => {
    const pos = getCanvasRelative(event);
    element.innerText = `x: ${event.clientX}, y: ${event.clientY}, canvasX: ${event.clientX - pos.bx.left}, canvasY: ${event.clientY - pos.bx.top}`;
    document.body.appendChild(element);
});


draw(ctx, canvas, state);
