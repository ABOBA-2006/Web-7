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
let ID = 0;

const getCurrentTimestamp = (timeZone = 'UTC') => {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const formattedDate = formatter.format(date);
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    return `${formattedDate}.${milliseconds}`;
};

window.onload = function() {
    clearServerFile();
    localStorage.clear();
    console.log('All events cleared from LocalStorage and Server');
};

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
    ID ++;
    saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Close button clicked");
    sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Close button clicked");
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

    let randomID = Math.floor(Math.random() * ID);
    getEventFromLocalStorage(randomID);
    getEventFromServer(randomID);
});

startButton.addEventListener('click', () => {
    ID ++;
    saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Start button clicked");
    sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Start button clicked");
    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    animationInterval = setInterval(() => {
        ID ++;
        circlePosition.x += direction.x;
        circlePosition.y += direction.y;

        // Collision
        if (circlePosition.x <= 0) {
            direction.x *= -1;
            saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle touched left border");
            sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle touched left border");
        }

        if (circlePosition.y + circle.clientHeight >= anim.clientHeight || circlePosition.y <= 0) {
            saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle touched top/bottom border");
            sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle touched top/bottom border");
            direction.y *= -1;
        }

        if (circlePosition.x + 20 > anim.clientWidth) {
            let currentOpacity = parseFloat(circle.style.opacity) || 1;
            circle.style.opacity = currentOpacity - 0.1;
        }

        if (parseFloat(circle.style.opacity) <= 0.1) {
            saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle went outside the anim-box");
            sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle went outside the anim-box");
            clearInterval(animationInterval);
            stopButton.style.display = 'none';
            reloadButton.style.display = 'inline-block';
            circle.style.display = 'none';
            circle.style.opacity = 1;
        }else{
            saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle moved");
            sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Circle moved");
        }

        circle.style.left = `${circlePosition.x}px`;
        circle.style.top = `${circlePosition.y}px`;
        
    }, 20);
});

stopButton.addEventListener('click', () => {
    ID ++;
    saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Stop button clicked");
    sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Stop button clicked");
    stopButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    clearInterval(animationInterval);
});

reloadButton.addEventListener('click', () => {
    ID ++;
    saveToLocalStorage(ID, getCurrentTimestamp('Europe/Kyiv'), "Reload button clicked");
    sendToServer(ID, getCurrentTimestamp('Europe/Kyiv'), "Reload button clicked");
    reloadButton.style.display = 'none';
    startButton.style.display = 'inline-block';
    circle.style.display = 'block';
    circlePosition = { x: 0, y: 0 };
    direction = getRandomDirection();
    circle.style.left = `${circlePosition.x}px`;
    circle.style.top = `${circlePosition.y}px`;
});