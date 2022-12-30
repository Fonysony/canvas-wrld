const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 30;
canvas.height = 30;
canvas.style.width = canvas.width;
canvas.style.height = canvas.height;
canvas.style.backgroundColor = '#115050';
context.strokeStyle = '#ff0000';
// context.beginPath();
// context.moveTo(10, 20);
// context.lineTo(20, 25);
// context.stroke();


// Draw a polygon for a given point
const drawPoints = function(context, points, close) {
  let i = 2;
  context.beginPath();
  context.moveTo(points[0], points[1]);
  while (i < points.length) {
    console.log(`index: ${i}, points[i]: ${points[i]}`);
    context.lineTo(points[i], points[i + 1]);
    i += 2;
  }
  if (close) context.closePath();
  context.stroke();
}

drawPoints(context, ['x','y',15,5,25,5,25,20,5,30], true);

const createPolygonPoints = function(context, cy, r, s) {
  context.stokeStyle = '#ddd000'
  let i = 0, points = [];
  while(i < s) {
    const a = Math.PI * 2 * (i/s);
    const x = Math.cos(a) * r + context;
    const y = Math.sin(a) * r + cy;
    points.push(x, y);
    i += 1;
  }
  return points;
}

// drawPoints(context, createPolygonPoints(15,15,5,4), true);
