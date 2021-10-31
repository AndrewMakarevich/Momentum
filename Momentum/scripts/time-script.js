

function dateScript() {
    const hash = window.location.hash.substr(1);
    console.log(hash);
    const currentDateBlock = document.querySelector('.main .currentDate');
    const currentTime = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateToShow = currentTime.toLocaleDateString(hash, options);
    currentDateBlock.innerText = dateToShow;
}

function timeScript() {
    const currentTimeBlock = document.querySelector('.main .currentTime');
    const currentTime = new Date();
    hours = currentTime.getHours();

    minutes = currentTime.getMinutes();
    seconds = currentTime.getSeconds();
    if (hours === 0 && minutes === 0 && seconds === 0) {
        dateScript();
    }
    timeToShow = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    currentTimeBlock.innerText = timeToShow;
}
dateScript();
timeScript();
setInterval(() => {
    timeScript();
}, 1000);
