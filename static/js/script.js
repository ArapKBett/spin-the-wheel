const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");

const segments = ["Prize 1", "Prize 2", "Prize 3", "Prize 4"];
const segmentColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8"];
const wheelRadius = canvas.width / 2;

let currentAngle = 0;
let isSpinning = false;

function drawWheel() {
    const arc = (2 * Math.PI) / segments.length;
    segments.forEach((segment, i) => {
        ctx.beginPath();
        ctx.fillStyle = segmentColors[i];
        ctx.moveTo(wheelRadius, wheelRadius);
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, currentAngle, currentAngle + arc);
        ctx.lineTo(wheelRadius, wheelRadius);
        ctx.fill();
        ctx.closePath();

        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate(currentAngle + arc / 2);
        ctx.fillStyle = "#000";
        ctx.fillText(segment, wheelRadius / 2, 10);
        ctx.restore();

        currentAngle += arc;
    });
}

drawWheel();

spinButton.addEventListener("click", () => {
    if (!isSpinning) {
        isSpinning = true;
        const spinDuration = Math.random() * 3 + 2;
        const spinSpeed = (Math.random() * 5 + 3) * Math.PI;

        let elapsedTime = 0;
        const spinInterval = setInterval(() => {
            elapsedTime += 0.05;
            currentAngle += spinSpeed * 0.05;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWheel();

            if (elapsedTime >= spinDuration) {
                clearInterval(spinInterval);
                isSpinning = false;
                displayResult();
            }
        }, 50);
    }
});

function displayResult() {
    const winningIndex = Math.floor((segments.length - (currentAngle / (2 * Math.PI)) % segments.length) % segments.length);
    resultDiv.textContent = `You won ${segments[winningIndex]}!`;
                   }
