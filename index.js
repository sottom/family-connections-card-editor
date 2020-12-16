function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    // circle
    // context.arc(width / 2, height / 2, width / 2, 0, 2 * Math.PI, true);
    // oval
    context.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
}

function each(arr, callback) {
    var length = arr.length;
    var i;

    for (i = 0; i < length; i++) {
        callback.call(arr, arr[i], i, arr);
    }

    return arr;
}

window.addEventListener('DOMContentLoaded', function () {
    function addImage() {
        var croppedCanvas;
        var roundedCanvas;
        var roundedImage;

        if (!croppable) {
            return;
        }

        // Crop
        croppedCanvas = cropper.getCroppedCanvas();

        // Round
        roundedCanvas = getRoundedCanvas(croppedCanvas);
        previewCanvas(roundedCanvas)


        // // Show
        // roundedImage = document.createElement('img');
        // roundedImage.src = roundedCanvas.toDataURL()
        // result.innerHTML = '';
        // result.appendChild(roundedImage);
    };

    // TODO: create a new cropper for the circle
    var image = document.getElementById('image');
    var previews = document.querySelectorAll('.preview');
    var croppable = false;
    var cropper = new Cropper(image, {
        aspectRatio: 1 / 1.2568,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.65,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
        ready: function () {
            croppable = true;
        },
        crop: function (event) {
        },
    });
    setInterval(() => {
        addImage()
    }, 1000)
    // button.addEventListener('click', e => {
    //     addImage()
    // })
});
