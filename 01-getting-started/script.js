    // create and inject a canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // append to container
    const container = document.getElementById('canvas-app');
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    const getCanvasRelative = function (event) {
        const canvas = event.target;
        const bx = canvas.getBoundingClientRect();
        return {
            x: event.clientX - bx.left,
            y: event.clientY - bx.top,
            bx: bx
        };
    };
    const state = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };
    const draw = function (ctx, canvas, state) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.translate(state.x, state.y);
        ctx.fillRect(-16, -16, 32, 32);
        ctx.restore();
    };
    canvas.addEventListener('mousedown', function(e){
        const pos = getCanvasRelative(e);
        e.preventDefault();
        state.x = pos.x;
        state.y = pos.y;
        draw(ctx, canvas, state);
    });
    draw(ctx, canvas, state);
