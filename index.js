var cropped1, cropped2;
window.addEventListener('DOMContentLoaded', function () {
    // TODO: create a new cropper for the circle
    createCropper('image', 1 / 1.2568).then(cropper1 => {
        cropped1 = getCrop(cropper1)
        previewCanvas(cropped1[0], cropped1[1])
        document.querySelector('#button').addEventListener('click', e => {
            cropped1 = getCrop(cropper1)
            previewCanvas(cropped1[0], cropped1[1])
        })
    })
    // let cropper2 = createCropper('image2', 1)

    // setInterval(() => {
    //     addImage()
    // }, 1000)
});


function getRoundedCanvas(sourceCanvas, type) {
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
    if (type == 'circle'){
        context.arc(width / 2, height / 2.25, width / 2, 0, 2 * Math.PI, true);
    } else {
        context.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI, true);
    }
    context.fill();
    return canvas;
}

function getCrop(cropper) {
    // Crop
    let croppedCanvas = cropper.getCroppedCanvas();

    // Round
    return [
        getRoundedCanvas(croppedCanvas),
        getRoundedCanvas(croppedCanvas, 'circle'),
    ]
};

function createCropper(id, aspectRatio) {
    return new Promise((resolve, reject) => {
        var image = document.getElementById(id);
        var croppable = false;
        var cropper = new Cropper(image, {
            aspectRatio,
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
                resolve(cropper)
            },
            crop: function (event) {
            },
        });
    })
}



