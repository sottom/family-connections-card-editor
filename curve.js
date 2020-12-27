let croppers = {};
let reference_canvas = document.querySelector("#canvas");
let reference_context = reference_canvas.getContext("2d");


var clickedFrame = null;
// do this mathematically based on the width of the container
let gpaGenY = 199;
let gpaSpouseJump = 175;
let gpaCoupleJump = 201;
let gpaX1 = 209;
let gpa2X = gpaX1 + gpaSpouseJump;
let gpa3X = gpa2X + gpaCoupleJump;
let gpa4X = gpa3X + gpaSpouseJump;
let gpa5X = gpa4X + gpaCoupleJump;
let gpa6X = gpa5X + gpaSpouseJump;
let gpa7X = gpa6X + gpaCoupleJump;
let gpa8X = gpa7X + gpaSpouseJump;

let parentGenY = gpaGenY + 305;
let parentSpouseJump = 379;
let parentCoupleJump = 200;
let parentX1 = gpaX1 + 88;
let parentX2 = parentX1 + parentSpouseJump;
let parentX3 = parentX2 + parentSpouseJump;
let parentX4 = parentX3 + parentSpouseJump;

let mainGenY = parentGenY + 305;
let mainX1 = 486
let mainX2 = mainX1 + 758

let childGenY = mainGenY + 45;
let childX1 = 867;

let frames = [
    { x: gpaX1, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa2X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa3X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa4X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa5X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa6X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa7X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: gpa8X, y: gpaGenY, img: {}, nameBox: {}, },
    { x: parentX1, y: parentGenY, img: {}, nameBox: {}, },
    { x: parentX2, y: parentGenY, img: {}, nameBox: {}, },
    { x: parentX3, y: parentGenY, img: {}, nameBox: {}, },
    { x: parentX4, y: parentGenY, img: {}, nameBox: {}, },
    { x: mainX1, y: mainGenY, img: {}, nameBox: {}, },
    { x: mainX2, y: mainGenY, img: {}, nameBox: {}, },
    { x: childX1, y: childGenY, img: {}, nameBox: {}, },
]

frames.forEach((frame, i) => {
    // hard coded
    frame.id = i + 1;
    frame.fillStyle = colors.darkblue;
    frame.radiusX = 86;
    frame.wtohRatio = 1.2568
    frame.rotation = 0;
    frame.startAngle = 0;
    frame.endAngle = 2 * Math.PI;
    frame.ellipse = new Path2D();

    // calculated
    frame.radiusY = frame.radiusX * frame.wtohRatio;
    frame.center = {
        x: frame.x - frame.radiusX,
        y: frame.y - frame.radiusY
    }
    frame.ellipse.ellipse(frame.x, frame.y, frame.radiusX, frame.radiusY, frame.rotation, frame.startAngle, frame.endAngle)

    // TODO: get images for each frame from online

    frame.nameBox.w = frame.radiusX * 2;
    frame.nameBox.h = 70;
    frame.nameBox.x = frame.x - frame.radiusX;
    frame.nameBox.y = frame.y + frame.radiusY - 50;
    frame.nameBox.radius = 5
    frame.nameBox.fill = true
    frame.nameBox.stroke = false
})

// add click to frames
reference_canvas.addEventListener('click', (e) => {
    let { x, y } = getMousePos(reference_canvas, e);
    frames.forEach(frame => {
        if (reference_context.isPointInPath(frame.ellipse, x, y)) {
            clickedFrame = frame.id
            $('#' + getOrCreateModalId(frame.id)).modal('show');
            document.querySelector(`#imgInp${clickedFrame}`).addEventListener('change', e => {
                document.querySelector(`#cropperImg${clickedFrame}`).src = "#";
                console.log(clickedFrame)
                if (e.target.files && e.target.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (event) {

                        document.querySelector(`#cropperImg${clickedFrame}`).src = event.target.result;
                        if (clickedFrame in croppers) {
                            let cropper = croppers[clickedFrame];
                            cropper.replace(event.target.result);
                            getCardPreview(cropper)
                        }
                        else {
                            createCropper(`cropperImg${clickedFrame}`, 1 / 1.2568).then(cropper => {
                                croppers[clickedFrame] = cropper;
                                getCardPreview(cropper)
                            })
                        }

                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
        }
    });
});

// add pointer to frames
reference_canvas.addEventListener('mousemove', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let { x, y } = getMousePos(reference_canvas, e);
    for (let frame of frames) {
        if (reference_context.isPointInPath(frame.ellipse, x, y)) {
            reference_canvas.style.cursor = "pointer";
            break;
        }
        else {
            reference_canvas.style.cursor = "default";
        }
    }
});

function cardPreview(frame_id, cropped_img, cropped_img2) {
    let card_canvas = document.querySelector(`#canvas-card${frame_id}`);
    let card_context = card_canvas.getContext("2d");

    let card_img = new Image();
    card_img.src = "img/nonamecard.png"
    card_img.onload = () => {
        // increase the actual size of our canvas
        card_canvas.width = card_img.width * devicePixelRatio;
        card_canvas.height = card_img.height * devicePixelRatio;
        // ensure all drawing operations are scaled
        card_context.scale(devicePixelRatio, devicePixelRatio);

        card_context.clearRect(0, 0, card_canvas.width, card_canvas.height);

        card_context.drawImage(card_img, 0, 0);

        // large picture
        let resize_ratio = 510 / cropped_img.width
        card_context.drawImage(cropped_img, 156, 174,
            resize_ratio * cropped_img.width, resize_ratio * cropped_img.height
        );

        // small picture
        resize_ratio = 114.5 / cropped_img2.width
        card_context.drawImage(cropped_img2, 95, 92,
            resize_ratio * cropped_img2.width, resize_ratio * cropped_img2.height
        );


        card_context.beginPath();
        card_context.fillStyle = colors.darkblue;
        card_context.moveTo(153, 734);
        card_context.quadraticCurveTo((665 + 153) / 2, 675, 665, 734);
        card_context.lineTo(665, 803)
        card_context.quadraticCurveTo((665 + 153) / 2, 862, 153, 803);
        card_context.lineTo(153, 731)
        card_context.fill()

    };
}

function referenceCanvas() {
    let card_img = new Image();
    card_img.src = "img/4 gen reference sheet no frames.png"
    card_img.onload = () => {
        // increase the actual size of our canvas
        reference_canvas.width = card_img.width * devicePixelRatio;
        reference_canvas.height = card_img.height * devicePixelRatio;

        // ensure all drawing operations are scaled
        reference_context.scale(devicePixelRatio, devicePixelRatio);

        reference_context.clearRect(0, 0, reference_canvas.width, reference_canvas.height);
        reference_context.drawImage(card_img, 0, 0);

        frames.forEach(frame => {
            if (clickedFrame == frame.id) {
                let img_resize_ratio = (frame.radiusX * 2 - 8) / cropped_img.width;
                frame.img.img = cropped_img
                frame.img.x = frame.center.x + 4
                frame.img.y = frame.center.y + 5
                frame.img.w = cropped_img.width * img_resize_ratio;
                frame.img.h = cropped_img.height * img_resize_ratio;
            }
        })

        frames.forEach(frame => {
            reference_context.fillStyle = frame.fillStyle;
            reference_context.fill(frame.ellipse);
            if ('img' in frame.img) {
                reference_context.drawImage(frame.img.img, frame.img.x, frame.img.y, frame.img.w, frame.img.h);
            }
            roundRect(reference_context, frame.nameBox.x, frame.nameBox.y, frame.nameBox.w, frame.nameBox.h, frame.nameBox.radius, frame.nameBox.fill, frame.nameBox.stroke);
        })
    };
}



function addImgToReferenceSheet(cropped_img) {
    let card_img = new Image();
    // card_img.src = "img/nonamecard.png"
    card_img.src = "img/4 gen reference sheet no frames.png"
    card_img.onload = () => {
        // increase the actual size of our canvas
        reference_canvas.width = card_img.width * devicePixelRatio;
        reference_canvas.height = card_img.height * devicePixelRatio;
        // ensure all drawing operations are scaled
        reference_context.scale(devicePixelRatio, devicePixelRatio);
        reference_context.clearRect(0, 0, reference_canvas.width, reference_canvas.height);
        reference_context.drawImage(card_img, 0, 0);

        frames.forEach(frame => {
            console.log(clickedFrame, frame.id)
            if (clickedFrame == frame.id) {
                let img_resize_ratio = (frame.radiusX * 2 - 8) / cropped_img.width;
                frame.img.img = cropped_img
                frame.img.x = frame.center.x + 4
                frame.img.y = frame.center.y + 5
                frame.img.w = cropped_img.width * img_resize_ratio;
                frame.img.h = cropped_img.height * img_resize_ratio;
            }
        })

        // reference_context.strokeStyle = colors.darkblue;
        // reference_context.fillStyle = colors.darkblue;
        // roundRect(reference_context, x, y + 175, 165, 50, 5, true);

        // reference_context.font = "30px Arial";
        // reference_context.fillStyle = colors.white;
        // reference_context.fillText("Mitchell", x + 45, y + 195);

        // reference_context.beginPath();
        // reference_context.arc(x + 41, y + 246.2, 20, 0, 2 * Math.PI, false);
        // reference_context.fillStyle = colors.red;
        // reference_context.fill();
        // reference_context.lineWidth = 1.5;
        // reference_context.strokeStyle = colors.black;
        // reference_context.stroke();

        // reference_context.beginPath();
        // reference_context.arc(x + 82, y + 246.2, 20, 0, 2 * Math.PI, false);
        // reference_context.fillStyle = colors.yellow;
        // reference_context.fill();
        // reference_context.lineWidth = 1.5;
        // reference_context.strokeStyle = colors.black;
        // reference_context.stroke();
        // reference_context.closePath();

        // reference_context.beginPath();
        // reference_context.arc(x + 123, y + 246.2, 20, 0, 2 * Math.PI, false);
        // reference_context.fillStyle = colors.green;
        // reference_context.fill();
        // reference_context.lineWidth = 1.5;
        // reference_context.strokeStyle = colors.black;
        // reference_context.stroke();
        // reference_context.closePath();

        frames.forEach(frame => {
            reference_context.fillStyle = frame.fillStyle;
            reference_context.fill(frame.ellipse);
            if ('img' in frame.img) {
                reference_context.drawImage(frame.img.img, frame.img.x, frame.img.y, frame.img.w, frame.img.h);
            }
            roundRect(reference_context, frame.nameBox.x, frame.nameBox.y, frame.nameBox.w, frame.nameBox.h, frame.nameBox.radius, frame.nameBox.fill, frame.nameBox.stroke);

            // reference_context.beginPath()
            // reference_context.lineWidth = 6;
            // reference_context.moveTo(frame.x, frame.y)
            // reference_context.lineTo(frame.x, frame.y - frame.radiusY - 5)
            // reference_context.stroke()

        })
    };
}

function getOrCreateModalId(id) {
    let modalId = `frame${id}Modal`;
    let modal = document.getElementById(modalId);
    if (!modal) {
        let div = document.createElement('div');
        div.innerHTML = modalHtml(id);
        modal = document.body.appendChild(div);
    }
    return modalId;
}

function modalHtml(id) {
    return `<div id="frame${id}Modal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <div class="img-container">
                                    <img id="cropperImg${id}" src="#" alt="your image" />
                                    <form id="photoFileInput${id}" runat="server">
                                        <input type='file' id="imgInp${id}" />
                                    </form>
                                    <button id="cropButton${id}">Crop/Preview in Card</button>
                                </div>
                            </div>
                            <div class="col-6">
                                <canvas id="canvas-card${id}"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        `
}

function getCardPreview(cropper) {
    let cropped = getCrop(cropper)
    cardPreview(clickedFrame, cropped[0], cropped[1])
    document.querySelector(`#cropButton${clickedFrame}`).addEventListener('click', e => {
        cropped = getCrop(cropper)
        console.log(clickedFrame)
        cardPreview(clickedFrame, cropped[0], cropped[1])
        addImgToReferenceSheet(cropped[0])
    })

}
