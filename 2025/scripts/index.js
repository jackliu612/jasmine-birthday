let openBtn = document.querySelector(".js-card-opener");

openBtn.onclick = function () {
  document.body.classList.toggle("open");
  if (document.body.classList.contains("open")) {
    jsConfetti.addConfetti({
            confettiRadius: 6,
            confettiNumber: 500,
            confettiColors: [
                '#E57200', '#232D4B',
              ],
        });
    }
};

let jsConfetti;

jsConfetti = new JSConfetti()

function setup() {
    new CircleType(document.getElementById('topText'))
    .radius(350);

    new CircleType(document.getElementById('bottomText'))
    .dir(-1)
    .radius(350);

}