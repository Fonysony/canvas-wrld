const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 40;
canvas.height = 40;
canvas.style.width = '100px';
canvas.style.height = '100px';

context.fillStyle = 'gray';
context.fillRect(0, 0, canvas.width, canvas.height);

context.strokeStyle = 'red';
context.strokeRect(0, 0, 20, 20); 

context.scale(.5, .5);
context.fillStyle = 'black';
context.fillRect(0, 0, 20, 20);
