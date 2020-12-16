function previewCanvas(cropped_img) {

    let canvas = document.querySelector("#canvas");
    let context = canvas.getContext("2d");

    let card_img = new Image();
    card_img.src = "img/blank_card.png"
    card_img.onload = () => {
        let targetWidth = 400

        // increase the actual size of our canvas
        canvas.width = card_img.width * devicePixelRatio;
        canvas.height = card_img.height * devicePixelRatio;
        // ensure all drawing operations are scaled
        context.scale(devicePixelRatio, devicePixelRatio);
        // scale everything down using CSS
        let ratio = targetWidth / card_img.width;
        canvas.style.width = targetWidth + 'px';
        canvas.style.height = card_img.height * ratio + 'px';

        let resize_ratio = 510 / cropped_img.width
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(cropped_img, 155, 176,
            resize_ratio*cropped_img.width, resize_ratio*cropped_img.height
        );
        context.drawImage(card_img, 0, 0);
    };
}
