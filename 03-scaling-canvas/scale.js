const scaleDraw = function(opt) {
  const fromCanvas = document.createElement('canvas');
  context = fromCanvas.getContext('2d');
  fromCanvas.width = opt.w;
  fromCanvas.height = opt.h;
  opt.draw(context);
  opt.toCanvas.getContext('2d').drawImage(
    fromCanvas, 
    opt.sx, opt.sy,
    opt.sw, opt.sh,
    opt.dx, opt.dy,
    opt.dw, opt.dh
  );
  const canvas = document.getElementById('the-canvas');
  const context = canvas.getContext('2d');

  canvas.width = 320;
  canvas.height = 240;
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  scaleDraw({
    toCanvas: canvas,
    draw: function(context) {
      context.fillStyle = 'red';
      context.fillRect(0, 0, 40, 40);
      context.fillStyle = 'green';
      context.fillRect(0, 0, 40, 40);
      context.fillStyle = 'blue';
      context.fillRect(0, 0, 40, 40);
    },
    w: 80, h: 80,
    sx: 20, sy: 20, sw: 40, sh: 40,
    dx: 20, dy: 20, dw: 280, dh: 200
  });
}
