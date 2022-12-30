const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const image = new Image;

image.src = "./images/minesheet.png";

image.onload = function() {
    console.log(canvas);
    context.drawImage(
        image,
        96, 0, // sx, sy
        16, 16, // sWidth, sHeight
        100, 100,  // dx, dy
        16, 16  // dWidth, dHeight
    );
}


