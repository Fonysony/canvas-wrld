window.addEventListener('load', function() {
    const canvas = this.document.querySelector('canvas');
    const context = canvas.getContext('2d');

    context.imageSmoothingEnabled = false;
    canvas.addEventListener('contextmenu', event => event.preventDefault());

    const loadImage = function(url) {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = function() {
                resolve(image);
            }
            image.src = url;
        });
    }

    const game = async function() {
        
    }
});