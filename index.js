const playButton = document.getElementById('play');
const work = document.getElementById('work');
const closeButton = document.getElementById('close');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const reloadButton = document.getElementById('reload');
const circle = document.getElementById('circle');
const anim = document.getElementById('anim');

let animationInterval;
let circlePosition = { x: 0, y: 0 };
let speed = 5;

function getRandomDirection() {
    const angle = Math.random() * (0.5 * Math.PI)
    return { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
}
let direction = getRandomDirection();

playButton.addEventListener('click', () => {
    work.style.display = 'block';
    document.getElementById("1").style.filter = 'blur(10px)';
    document.getElementById("2").style.filter = 'blur(10px)';
});

closeButton.addEventListener('click', () => {
    clearInterval(animationInterval);
    work.style.display = 'none';
    reloadButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    circle.style.display = 'block';
    circlePosition = { x: 0, y: 0 };
    direction = getRandomDirection();
    circle.style.left = `${circlePosition.x}px`;
    circle.style.top = `${circlePosition.y}px`;
    document.getElementById("1").style.filter = 'blur(0px)';
    document.getElementById("2").style.filter = 'blur(0px)';
});

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    animationInterval = setInterval(() => {
        circlePosition.x += direction.x;
        circlePosition.y += direction.y;

        // Collision
        if (circlePosition.x <= 0) {
            direction.x *= -1;
        }

        if (circlePosition.y + circle.clientHeight >= anim.clientHeight || circlePosition.y <= 0) {
            direction.y *= -1;
        }

        if (circlePosition.x + 20 > anim.clientWidth) {
            let currentOpacity = parseFloat(circle.style.opacity) || 1;
            circle.style.opacity = currentOpacity - 0.1;
        }

        if (parseFloat(circle.style.opacity) <= 0.1) {
            clearInterval(animationInterval);
            stopButton.style.display = 'none';
            reloadButton.style.display = 'inline-block';
            circle.style.display = 'none';
            circle.style.opacity = 1;
        }

        circle.style.left = `${circlePosition.x}px`;
        circle.style.top = `${circlePosition.y}px`;
    }, 20);
});

stopButton.addEventListener('click', () => {
    stopButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    clearInterval(animationInterval);
});

reloadButton.addEventListener('click', () => {
    reloadButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    circle.style.display = 'block';
    circlePosition = { x: 0, y: 0 };
    direction = getRandomDirection();
    circle.style.left = `${circlePosition.x}px`;
    circle.style.top = `${circlePosition.y}px`;
});