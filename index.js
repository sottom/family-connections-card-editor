////////////////////////////////////////////
// TODOs
////////////////////////////////////////////
// - Add date fields to modals
// - Better cropping/previewing experience (button somewhere else)
// - Make the save changes button work

// - Save the state of the reference sheet
// - Save images they use (img should have a link)

// - Review game button after all info is in
// - we calculate timespans, update colors, add to cards, then show everything
// - check that a birth, marriage, and death happen in at least one time span (the same one) - see if challenge cards all work

// - add to cart button after they review

// - add default reference sheet name based on card name
// - Maybe add names to each person (child1, parent1, gpa 1, etc.)
////////////////////////////////////////////

window.addEventListener('DOMContentLoaded', e => {
    drawOriginalReferenceSheet()
});

////////////////////////////////////////////
// Globals
////////////////////////////////////////////
var croppers = {};
var changeListeners = [];
let reference_canvas = document.querySelector("#canvas");
let reference_context = reference_canvas.getContext("2d");
let focusedPerson = null;
let people = createCommonPeople()

function createCommonPeople() {
    // TODO: do this mathematically based on the width of the container (low priority)
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

    let peoples = {
        1: { x: gpaX1, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        2: { x: gpa2X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        3: { x: gpa3X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        4: { x: gpa4X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        5: { x: gpa5X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        6: { x: gpa6X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        7: { x: gpa7X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        8: { x: gpa8X, y: gpaGenY, img: {}, nameBox: {}, fillerText: {}, },
        9: { x: parentX1, y: parentGenY, img: {}, nameBox: {}, fillerText: {}, },
        10: { x: parentX2, y: parentGenY, img: {}, nameBox: {}, fillerText: {}, },
        11: { x: parentX3, y: parentGenY, img: {}, nameBox: {}, fillerText: {}, },
        12: { x: parentX4, y: parentGenY, img: {}, nameBox: {}, fillerText: {}, },
        13: { x: mainX1, y: mainGenY, img: {}, nameBox: {}, fillerText: {}, },
        14: { x: mainX2, y: mainGenY, img: {}, nameBox: {}, fillerText: {}, },
        15: { x: childX1, y: childGenY, img: {}, nameBox: {}, fillerText: {}, },
    }

    for (let [pid, person] of Object.entries(peoples)) {
        // hard coded
        console.log(1)
        person.fillStyle = colors.darkblue;
        person.radiusX = 86;
        person.wtohRatio = 1.2568
        person.rotation = 0;
        person.startAngle = 0;
        person.endAngle = 2 * Math.PI;
        person.ellipse = new Path2D();

        console.log(2)
        // get text position
        person.fillerText.x = person.x;
        person.fillerText.y = person.y;
        person.fillerText.size = "40px";
        person.fillerText.font = "Arial";
        person.fillerText.text = "Click\nMe";

        console.log(3)
        // calculated
        person.radiusY = person.radiusX * person.wtohRatio;
        person.center = {
            x: person.x - person.radiusX,
            y: person.y - person.radiusY
        }
        person.ellipse.ellipse(person.x, person.y, person.radiusX, person.radiusY, person.rotation, person.startAngle, person.endAngle)

        console.log(4)
        // TODO: get images for each person from online

        person.nameBox.w = person.radiusX * 2;
        person.nameBox.h = 70;
        person.nameBox.x = person.x - person.radiusX;
        person.nameBox.y = person.y + person.radiusY - 50;
        person.nameBox.textSize = "30px"
        person.nameBox.font = "Arapey"
        person.nameBox.radius = 5
        person.nameBox.fill = true
        person.nameBox.stroke = false
        person.nameBox.text = {
            top: {
                text: '',
                x: person.x,
                y: person.y + 85,
            },
            bottom: {
                text: "",
                x: person.x,
                y: person.y + 115,
            },
        }

        console.log(5)
        person.card = {
            oval_img: null,
            circle_img: null,
            name: {
                x: (665 + 153) / 2,
                y: person.y + 582,
                text: "",
                size: "45px",
                font: "Arapey",
            },
            birthdate: null,
            birthrange: null,
            marriagedate: null,
            marriagerange: null,
            deathdate: null,
            deathrange: null,

            marriage2date: null,
            marriage2range: null,

            marriage3date: null,
            marriage3range: null,
        }
        console.log(6)

    }
    return peoples
}

////////////////////////////////////////////
// Main functionallity
////////////////////////////////////////////
reference_canvas.addEventListener('click', (e) => {
    let { x, y } = getMousePos(reference_canvas, e);
    for (let [pid, person] of Object.entries(people)) {
        // only proceed with the correct person
        if (!reference_context.isPointInPath(person.ellipse, x, y)) continue;

        // set the globally focused person
        focusedPerson = pid

        // show the correct modal
        let modalId = getOrCreateModalId(focusedPerson);
        $(`#${modalId}`).modal('show');

        // keep from making a listener every time a person is clicked
        if (focusedPerson in changeListeners) break;
        changeListeners.push(focusedPerson);

        // preview uploaded img
        document.querySelector(`#imgInp${focusedPerson}`).addEventListener('change', e => {
            if (!e.target.files || !e.target.files[0]) return;
            file_type = e.target.files[0].type;
            if (file_type.includes('video') || file_type.includes('audio')) {
                alert(`This is a ${file_type} file. Please upload an image file.`)
                return;
            }
            previewUploadedImg(e)
        });

        document.querySelector(`#nameoncard${focusedPerson}`).addEventListener('keyup', e => {
            let person = people[focusedPerson];
            person.card.name.text = e.target.value;
            drawCard(focusedPerson, person.card.oval_img, person.card.circle_img)
        })

        document.querySelector(`#nameonrefsheet${focusedPerson}`).addEventListener('keyup', e => {
            // 13 letters per line
            let names = e.target.value.split(" ")
            let split = Math.floor(names.length / 2);
            person.nameBox.text.top.text = names.slice(0, split).join(" ");
            person.nameBox.text.bottom.text = names.slice(split).join(" ");
            drawReferenceSheet(person.img.img)
        })

        document.querySelector(`#birthdate${focusedPerson}`).addEventListener('change', e => {
            people[focusedPerson].card.birthdate = new Date(e.target.value);
        })

        document.querySelector(`#marriagedate${focusedPerson}`).addEventListener('change', e => {
            people[focusedPerson].card.marriagedate = new Date(e.target.value);
        })

        document.querySelector(`#deathdate${focusedPerson}`).addEventListener('change', e => {
            people[focusedPerson].card.deathdate = new Date(e.target.value);
        })
    };
});
////////////////////////////////////////////

// add pointer to people
reference_canvas.addEventListener('mousemove', (e) => {
    e.preventDefault();
    e.stopPropagation();
    let { x, y } = getMousePos(reference_canvas, e);
    for (let [pid, person] of Object.entries(people)) {
        if (reference_context.isPointInPath(person.ellipse, x, y)) {
            reference_canvas.style.cursor = "pointer";
            break;
        }
        else {
            reference_canvas.style.cursor = "default";
        }
    }
});

function drawCard(person_id, cropped_img, cropped_img2) {
    let person = people[person_id];
    person.card.oval_img = cropped_img;
    person.card.circle_img = cropped_img2;

    let card_canvas = document.querySelector(`#canvas-card${person_id}`);
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

        drawCardNameBox(card_context)

        console.log(person)
        if (person.card.name.text) {
            // add filler text
            card_context.font = person.card.name.size + " " + person.card.name.font;
            card_context.fillStyle = colors.white;
            card_context.textAlign = "center";
            card_context.fillText(person.card.name.text, person.card.name.x, person.card.name.y);
        }
    };
}

function drawOriginalReferenceSheet() {
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

        for (let [pid, person] of Object.entries(people)) {
            if (focusedPerson == pid) {
                let img_resize_ratio = (person.radiusX * 2 - 8) / cropped_img.width;
                person.img.img = cropped_img
                person.img.x = person.center.x + 4
                person.img.y = person.center.y + 5
                person.img.w = cropped_img.width * img_resize_ratio;
                person.img.h = cropped_img.height * img_resize_ratio;
            }
        }

        for (let [pid, person] of Object.entries(people)) {
            // add person ellipse
            reference_context.fillStyle = person.fillStyle;
            reference_context.fill(person.ellipse);

            // add filler text
            reference_context.font = person.fillerText.size + " " + person.fillerText.font;
            reference_context.fillStyle = colors.white;
            reference_context.textAlign = "center";
            reference_context.fillText(person.fillerText.text, person.fillerText.x, person.fillerText.y);

            // add image
            if ('img' in person.img) {
                reference_context.drawImage(person.img.img, person.img.x, person.img.y, person.img.w, person.img.h);
            }

            // make namebox
            reference_context.fillStyle = person.fillStyle;
            roundRect(reference_context, person.nameBox.x, person.nameBox.y, person.nameBox.w, person.nameBox.h, person.nameBox.radius, person.nameBox.fill, person.nameBox.stroke);
        }
    };
}



function drawReferenceSheet(cropped_img) {
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

        for (let [pid, person] of Object.entries(people)) {
            if (focusedPerson == pid) {
                let img_resize_ratio = (person.radiusX * 2 - 8) / cropped_img.width;
                person.img.img = cropped_img
                person.img.x = person.center.x + 4
                person.img.y = person.center.y + 5
                person.img.w = cropped_img.width * img_resize_ratio;
                person.img.h = cropped_img.height * img_resize_ratio;
            }
        }

        for (let [pid, person] of Object.entries(people)) {
            reference_context.fillStyle = person.fillStyle;
            reference_context.fill(person.ellipse);

            // add filler text
            reference_context.font = person.fillerText.size + " " + person.fillerText.font;
            reference_context.fillStyle = colors.white;
            reference_context.textAlign = "center";
            reference_context.fillText(person.fillerText.text, person.fillerText.x, person.fillerText.y);

            if ('img' in person.img) {
                reference_context.drawImage(person.img.img, person.img.x, person.img.y, person.img.w, person.img.h);
            }

            reference_context.fillStyle = colors.darkblue;
            roundRect(reference_context, person.nameBox.x, person.nameBox.y, person.nameBox.w, person.nameBox.h, person.nameBox.radius, person.nameBox.fill, person.nameBox.stroke);

            if (person.nameBox.text.top) {
                reference_context.font = person.nameBox.textSize + " " + person.nameBox.font;
                reference_context.fillStyle = colors.white;
                reference_context.textAlign = "center";
                reference_context.fillText(person.nameBox.text.top.text, person.nameBox.text.top.x, person.nameBox.text.top.y);
                reference_context.fillText(person.nameBox.text.bottom.text, person.nameBox.text.bottom.x, person.nameBox.text.bottom.y);
            }

            // reference_context.beginPath()
            // reference_context.lineWidth = 6;
            // reference_context.moveTo(person.x, person.y)
            // reference_context.lineTo(person.x, person.y - person.radiusY - 5)
            // reference_context.stroke()

        }
    };
}

function getOrCreateModalId(id) {
    let modalId = `person${id}Modal`;
    let modal = document.getElementById(modalId);
    if (!modal) {
        let div = document.createElement('div');
        div.innerHTML = modalHtml(id);
        modal = document.body.appendChild(div);
    }
    return modalId;
}

function modalHtml(id) {
    return `<div id="person${id}Modal" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                                    <button id="cropButton${id}" style="display: none;">Crop/Preview in Card</button>
                                    <img id="cropperImg${id}" src="#" alt="your image" accept="image/*" />
                                    <form id="photoFileInput${id}" runat="server">
                                        <input type='file' id="imgInp${id}" />
                                    </form>
                                </div>
                            </div>
                            <div class="col-6">
                                <canvas id="canvas-card${id}"></canvas>

                                <label for="nameoncard${id}" class="2 col-form-label">Name on Card</label>
                                <input type="text" name="nameoncard${id}" class="form-control-plaintext" id="nameoncard${id}" >

                                <label for="nameonrefsheet${id}" class="2 col-form-label">Name on Reference Sheet</label>
                                <input type="text" name="nameonrefsheet${id}" class="form-control-plaintext" id="nameonrefsheet${id}" >

                                <label for="birthdate${id}" class="2 col-form-label">Birth Date</label>
                                <input type="date" name="birthdate${id}" class="form-control-plaintext" id="birthdate${id}" >

                                <label for="marriagedate${id}" class="2 col-form-label">Marriage Date</label>
                                <input type="date" name="marriagedate${id}" class="form-control-plaintext" id="marriagedate${id}" >

                                <label for="deathdate${id}" class="2 col-form-label">Death Date</label>
                                <input type="date" name="deathdate${id}" class="form-control-plaintext" id="deathdate${id}" >
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
    drawCard(focusedPerson, cropped[0], cropped[1])
    drawReferenceSheet(cropped[0])
    document.querySelector(`#cropButton${focusedPerson}`).addEventListener('click', e => {
        cropped = getCrop(cropper)
        drawCard(focusedPerson, cropped[0], cropped[1])
        drawReferenceSheet(cropped[0])
    })

}

function previewUploadedImg(e) {
    var reader = new FileReader();
    reader.onload = event => {
        document.querySelector(`#cropperImg${focusedPerson}`).src = event.target.result;
        document.querySelector(`#cropButton${focusedPerson}`).style.display = 'block';
        if (focusedPerson in croppers) {
            let cropper = croppers[focusedPerson];
            cropper.replace(event.target.result);
            getCardPreview(cropper);
        }
        else {
            createCropper(`cropperImg${focusedPerson}`, 1 / 1.2568)
                .then(cropper => {
                    croppers[focusedPerson] = cropper;
                    getCardPreview(cropper);
                })
                .catch(err => console.log(err))
        }
    }
    reader.readAsDataURL(e.target.files[0]);
}


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
    if (type == 'circle') {
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
        try {
            var cropper = new Cropper(image, {
                aspectRatio,
                viewMode: 1,
                dragMode: 'move',
                responsive: true,
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
        } catch (error) {
            reject(error)
        }
    })
}

function drawCardNameBox(card_context) {
    card_context.beginPath();
    card_context.fillStyle = colors.darkblue;
    card_context.moveTo(153, 734);
    card_context.quadraticCurveTo((665 + 153) / 2, 675, 665, 734);
    card_context.lineTo(665, 803)
    card_context.quadraticCurveTo((665 + 153) / 2, 862, 153, 803);
    card_context.lineTo(153, 731)
    card_context.fill();
}

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
