function playerScript() {
    const player = document.querySelector('.player');

    player.src = '../audios/audio1.mp3';

    playerTrack = document.querySelector('.track');
    trackTime = playerTrack.querySelector('.track-time');

    playBtn = document.querySelector('.player-btn-play');
    pauseBtn = document.querySelector('.player-btn-pause');
    prevBtn = document.querySelector('.player-btn-pause');
    nextBtn = document.querySelector('.player-next-btn');

    let timLine;
    playBtn.addEventListener('click', () => {
        pauseBtn.classList.remove('unactive');
        playBtn.classList.add('unactive');
        player.play();
        trackTime.max = player.duration;
        timeLine = setInterval(() => {
            setTimeLine(player.currentTime, player.duration);
            console.log('play');
        }, 10);


    });
    pauseBtn.addEventListener('click', () => {
        playBtn.classList.remove('unactive');
        pauseBtn.classList.add('unactive');
        clearInterval(timeLine);
        player.pause();
    });

    trackTime.oninput = () => {
        const value = trackTime.value;
        player.currentTime = value;
    };

    function setTimeLine(currentTime = 0, duration = 0) {
        trackTime.value = `${(currentTime / duration) * trackTime.max}`;
    };


}
playerScript();