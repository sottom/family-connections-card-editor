function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    console.log(width, height)
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
        console.log(croppedCanvas)
        roundedCanvas = getRoundedCanvas(croppedCanvas);

        // Show
        roundedImage = document.createElement('img');
        roundedImage.src = roundedCanvas.toDataURL()
        result.innerHTML = '';
        result.appendChild(roundedImage);
    };

    var image = document.getElementById('image');
    var button = document.getElementById('button');
    var result = document.getElementById('result');
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
            var clone = this.cloneNode();

            clone.className = '';
            clone.style.cssText = (
                'display: block;' +
                'width: 100%;' +
                'min-width: 0;' +
                'min-height: 0;' +
                'max-width: none;' +
                'max-height: none;'
            );

            each(previews, function (elem) {
                elem.appendChild(clone.cloneNode());
            });
            previewReady = true;
        },
        crop: function (event) {
            if (!previewReady) {
                return;
            }

            var data = event.detail;
            var cropper = this.cropper;
            var imageData = cropper.getImageData();
            var previewAspectRatio = 1 / 1.2568;

            each(previews, function (elem) {
                var previewImage = elem.getElementsByTagName('img').item(0);
                var previewWidth = elem.offsetWidth;
                var previewHeight = previewWidth / previewAspectRatio;
                var imageScaledRatio = data.width / previewWidth;

                elem.style.height = previewHeight + 'px';
                elem.style.borderRadius = "50%";
                previewImage.style.width = imageData.naturalWidth / imageScaledRatio + 'px';
                previewImage.style.height = imageData.naturalHeight / imageScaledRatio + 'px';
                previewImage.style.marginLeft = -data.x / imageScaledRatio + 'px';
                previewImage.style.marginTop = -data.y / imageScaledRatio + 'px';
            });
        },
    });
    button.addEventListener('click', e => {
        addImage()
    })
});
