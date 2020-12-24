function previewCanvas(cropped_img, cropped_img2) {

    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");


    let card_img = new Image();
    // card_img.src = "img/nonamecard.png"
    card_img.src = "img/4 gen reference sheet no frames.png"
    card_img.onload = () => {
        let targetWidth = 600

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

        // // large picture
        // let resize_ratio = 510 / cropped_img.width
        // context.drawImage(cropped_img, 156, 174,
        //     resize_ratio*cropped_img.width, resize_ratio*cropped_img.height
        // );

        // // small picture
        // resize_ratio = 114.5 / cropped_img2.width
        // context.drawImage(cropped_img2, 95, 92,
        //     resize_ratio*cropped_img2.width, resize_ratio*cropped_img2.height
        // );

        let colors = {
            green: '#33790e',
            blue: '#51b4b4',
            yellow: '#d6982f',
            red: '#a80808',
            purple: '#713274',
            darkblue: '#180147',
            black: '#000000',
            white: '#FFFFFF',
        }

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
        console.log((163 / cropped_img.width) * cropped_img.height)
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

            let img_resize_ratio = (frame.radiusX * 2 - 8) / cropped_img.width;
            frame.img.img = cropped_img
            frame.img.x = frame.center.x + 4
            frame.img.y = frame.center.y + 5
            frame.img.w = cropped_img.width * img_resize_ratio;
            frame.img.h = cropped_img.height * img_resize_ratio;

            frame.nameBox.w = frame.radiusX * 2;
            frame.nameBox.h = 50;
            frame.nameBox.x = frame.x - frame.radiusX;
            frame.nameBox.y = frame.y + frame.radiusY - 40;
            frame.nameBox.radius = 5
            frame.nameBox.fill = true
            frame.nameBox.stroke = false
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


        canvas.addEventListener('click', (e) => {
            let {x, y} = getMousePos(canvas, e);
            frames.forEach(frame => {
                if (context.isPointInPath(frame.ellipse, x, y)) {
                    alert('click on frame: ' + frame.id);
                }
            });
        });

        frames.forEach(frame => {
            context.fillStyle = frame.fillStyle;
            context.fill(frame.ellipse);
            context.drawImage(frame.img.img, frame.img.x, frame.img.y, frame.img.w, frame.img.h);
            roundRect(context, frame.nameBox.x, frame.nameBox.y, frame.nameBox.w, frame.nameBox.h, frame.nameBox.radius, frame.nameBox.fill, frame.nameBox.stroke);

            // context.beginPath()
            // context.lineWidth = 6;
            // context.moveTo(frame.x, frame.y)
            // context.lineTo(frame.x, frame.y - frame.radiusY - 5)
            // context.stroke()

        })


        // x = 127 + 175
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 503
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 503 + 176
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 883
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 883 + 175.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 1259
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 1259 + 175.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);

        // // middle row
        // y = 402
        // x = 215.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 594.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 594.5 + 377
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 594.5 + 377 + 379
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);

        // // bottom row
        // y = 706.5
        // x = 403.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
        // x = 403.5 + 757.5
        // context.drawImage(cropped_img, x, y, resize_ratio * cropped_img.width, resize_ratio * cropped_img.height);
    };
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
        stroke = true;
    }
    if (typeof radius === 'undefined') {
        radius = 5;
    }
    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}

function isIntersect(point, circle) {
    return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}

function isInEllipse(pos, frame, w, h){
    var dx=pos.x-frame.x;
    var dy=pos.y-frame.y;
    let val = ((dx*dx)/(w*w)+(dy*dy)/(h*h))
    console.log(val)
    return val;
}

// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas/17130415
function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}

// function getMousePos(canvas, evt) {
//     var rect = canvas.getBoundingClientRect();
//     return {
//         x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
//         y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
//     };
// }
