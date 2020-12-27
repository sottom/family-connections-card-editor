function cardPreview(cropped_img, cropped_img2){

    let canvas = document.querySelector("#canvas-card");
    let context = canvas.getContext("2d");


    let card_img = new Image();
    card_img.src = "img/nonamecard.png"
    card_img.onload = () => {
        let targetWidth = 300

        // increase the actual size of our canvas
        canvas.width = card_img.width * devicePixelRatio;
        canvas.height = card_img.height * devicePixelRatio;
        // ensure all drawing operations are scaled
        context.scale(devicePixelRatio, devicePixelRatio);

        // SCALE EVERYTHING DOWN USING CSS
        let ratio = targetWidth / card_img.width;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = card_img.height * ratio + 'px';

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(card_img, 0, 0);

        // large picture
        let resize_ratio = 510 / cropped_img.width
        context.drawImage(cropped_img, 156, 174,
            resize_ratio*cropped_img.width, resize_ratio*cropped_img.height
        );

        // small picture
        resize_ratio = 114.5 / cropped_img2.width
        context.drawImage(cropped_img2, 95, 92,
            resize_ratio*cropped_img2.width, resize_ratio*cropped_img2.height
        );


        context.beginPath();
        context.fillStyle = colors.darkblue;
        context.moveTo(153, 734);
        context.quadraticCurveTo((665+153)/2, 675, 665, 734);
        context.lineTo(665, 803)
        context.quadraticCurveTo((665+153)/2, 862, 153, 803);
        context.lineTo(153, 731)
        context.fill()

    };
}

function previewCanvas(cropped_img) {

    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");


    let card_img = new Image();
    // card_img.src = "img/nonamecard.png"
    card_img.src = "img/4 gen reference sheet no frames.png"
    card_img.onload = () => {
        let targetWidth = 500

        // increase the actual size of our canvas
        canvas.width = card_img.width * devicePixelRatio;
        canvas.height = card_img.height * devicePixelRatio;
        // ensure all drawing operations are scaled
        context.scale(devicePixelRatio, devicePixelRatio);

        // SCALE EVERYTHING DOWN USING CSS
        let ratio = targetWidth / card_img.width;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = card_img.height * ratio + 'px';

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(card_img, 0, 0);

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
            { x: gpaX1, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa2X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa3X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa4X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa5X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa6X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa7X, y: gpaGenY, img: {}, nameBox: {},},
            { x: gpa8X, y: gpaGenY, img: {}, nameBox: {},},
            { x: parentX1, y: parentGenY, img: {}, nameBox: {},},
            { x: parentX2, y: parentGenY, img: {}, nameBox: {},},
            { x: parentX3, y: parentGenY, img: {}, nameBox: {},},
            { x: parentX4, y: parentGenY, img: {}, nameBox: {},},
            { x: mainX1, y: mainGenY, img: {}, nameBox: {},},
            { x: mainX2, y: mainGenY, img: {}, nameBox: {},},
            { x: childX1, y: childGenY, img: {}, nameBox: {},},
        ]
        frames.forEach((frame,i) => {
            // hard coded
            frame.id = i + 1;
            frame.fillStyle = colors.darkblue;
            frame.radiusX = 86;
            frame.wtohRatio = 1.2568
            frame.rotation = 0;
            frame.startAngle = 0;
            frame.endAngle = 2*Math.PI;
            frame.ellipse = new Path2D();

            // calculated
            frame.radiusY = frame.radiusX * frame.wtohRatio;
            frame.center = {
                x: frame.x - frame.radiusX,
                y: frame.y - frame.radiusY
            }
            frame.ellipse.ellipse(frame.x, frame.y, frame.radiusX, frame.radiusY, frame.rotation, frame.startAngle, frame.endAngle)

            // let img_resize_ratio = (frame.radiusX * 2 - 8) / cropped_img.width;
            // frame.img.img = cropped_img
            // frame.img.x = frame.center.x + 4
            // frame.img.y = frame.center.y + 5
            // frame.img.w = cropped_img.width * img_resize_ratio;
            // frame.img.h = cropped_img.height * img_resize_ratio;

            // frame.nameBox.w = frame.radiusX * 2;
            // frame.nameBox.h = 70;
            // frame.nameBox.x = frame.x - frame.radiusX;
            // frame.nameBox.y = frame.y + frame.radiusY - 50;
            // frame.nameBox.radius = 5
            // frame.nameBox.fill = true
            // frame.nameBox.stroke = false
        })


        // context.strokeStyle = colors.darkblue;
        // context.fillStyle = colors.darkblue;
        // roundRect(context, x, y + 175, 165, 50, 5, true);

        // context.font = "30px Arial";
        // context.fillStyle = colors.white;
        // context.fillText("Mitchell", x + 45, y + 195);

        // context.beginPath();
        // context.arc(x + 41, y + 246.2, 20, 0, 2 * Math.PI, false);
        // context.fillStyle = colors.red;
        // context.fill();
        // context.lineWidth = 1.5;
        // context.strokeStyle = colors.black;
        // context.stroke();

        // context.beginPath();
        // context.arc(x + 82, y + 246.2, 20, 0, 2 * Math.PI, false);
        // context.fillStyle = colors.yellow;
        // context.fill();
        // context.lineWidth = 1.5;
        // context.strokeStyle = colors.black;
        // context.stroke();
        // context.closePath();

        // context.beginPath();
        // context.arc(x + 123, y + 246.2, 20, 0, 2 * Math.PI, false);
        // context.fillStyle = colors.green;
        // context.fill();
        // context.lineWidth = 1.5;
        // context.strokeStyle = colors.black;
        // context.stroke();
        // context.closePath();


        // add click to frames
        canvas.addEventListener('click', (e) => {
            let {x, y} = getMousePos(canvas, e);
            frames.forEach(frame => {
                if (context.isPointInPath(frame.ellipse, x, y)) {
                    alert('click on frame: ' + frame.id);
                }
            });
        });

        // add pointer to frames
        canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            e.stopPropagation();
            let {x, y} = getMousePos(canvas, e);
            for(let frame of frames){
                if (context.isPointInPath(frame.ellipse, x, y)) {
                    canvas.style.cursor = "pointer";
                    break;
                }
                else {
                    canvas.style.cursor = "default";
                }
            }
        });

        frames.forEach(frame => {
            context.fillStyle = frame.fillStyle;
            context.fill(frame.ellipse);
            // context.drawImage(frame.img.img, frame.img.x, frame.img.y, frame.img.w, frame.img.h);
            roundRect(context, frame.nameBox.x, frame.nameBox.y, frame.nameBox.w, frame.nameBox.h, frame.nameBox.radius, frame.nameBox.fill, frame.nameBox.stroke);

            // context.beginPath()
            // context.lineWidth = 6;
            // context.moveTo(frame.x, frame.y)
            // context.lineTo(frame.x, frame.y - frame.radiusY - 5)
            // context.stroke()

        })
    };
}
