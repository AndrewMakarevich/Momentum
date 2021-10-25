function playerScript() {
    const player = document.querySelector('.player');



    playerTrack = document.querySelector('.track');
    trackTimer = playerTrack.querySelector('.track-timer');
    trackTime = playerTrack.querySelector('.track-time');


    playerSoundBlock = playerTrack.querySelector('.player-sound-block');
    playerSoundBtn = playerSoundBlock.querySelector('.player-sound-btn');
    playerSound = playerSoundBlock.querySelector('.player-sound');

    playBtn = document.querySelector('.player-btn-play');
    pauseBtn = document.querySelector('.player-btn-pause');
    prevBtn = document.querySelector('.player-prev-btn');
    nextBtn = document.querySelector('.player-next-btn');


    // MUSIC SELECTION
    const musicList = document.querySelector('.music-list__list');
    const musicListItems = musicList.querySelectorAll('li');

    let musicNameArr = [];
    musicListItems.forEach(item => {
        musicNameArr = [...musicNameArr, item.dataset.music]
    });
    player.src = `../audios/${musicNameArr[0]}.mp3`;


    let step = 0;

    styleActiveMusic();

    prevBtn.addEventListener('click', () => {
        step = step - 1;
        if (step < 0) {
            step = musicNameArr.length - 1;
        }
        playerSrc = `../audios/${musicNameArr[step]}.mp3`;
        disablePlayer();
        activatePlayer(playerSrc, true);
        styleActiveMusic();
    });
    nextBtn.addEventListener('click', () => {
        step = step + 1;
        if (step > musicNameArr.length - 1) {
            step = 0;
        }
        playerSrc = `../audios/${musicNameArr[step]}.mp3`;
        disablePlayer();
        activatePlayer(playerSrc, true);
        styleActiveMusic();
    });

    function styleActiveMusic() {
        musicListItems.forEach(item => {
            Number(item.id) === step ? item.classList.add('activeMusic') : item.classList.remove('activeMusic');
        });
    }
    // -----------------

    let timeLine;

    playBtn.addEventListener('click', () => {
        playerSrc = `../audios/${musicNameArr[step]}.mp3`;
        activatePlayer(playerSrc);
    });
    pauseBtn.addEventListener('click', () => {
        disablePlayer();
    });

    player.onended = () => {
        clearInterval(timeLine);
    };

    trackTime.oninput = () => {
        const value = trackTime.value;
        player.currentTime = value;
    };

    playerSoundBlock.addEventListener('mouseover', () => {
        playerSound.classList.add('onchange');
    });
    playerSoundBlock.addEventListener('mouseout', () => {
        playerSound.classList.remove('onchange');
    });

    playerSound.oninput = () => {
        player.volume = playerSound.value;
    };



    function activatePlayer(src, next = false) {
        if (next) {
            player.src = src;
        }

        pauseBtn.classList.remove('unactive');
        playBtn.classList.add('unactive');
        player.play();

        if (!player.duration) {
            player.onloadedmetadata = () => {
                activateTimeLineTimer()
            };
        } else {
            activateTimeLineTimer()
        }



    }
    function disablePlayer() {
        playBtn.classList.remove('unactive');
        pauseBtn.classList.add('unactive');
        clearInterval(timeLine);
        player.pause();
    }

    function activateTimeLineTimer() {
        trackTime.max = player.duration;
        let minutes = Math.trunc(player.duration / 60);
        let seconds = Math.floor(player.duration - (minutes * 60));


        timeLine = setInterval(() => {
            trackTimer.innerText = `${setTimer(player.currentTime, player.duration)}/${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
            setTimeLine(player.currentTime, player.duration);
        }, 10);
    }

    function setTimer(currentTime = 0) {
        const minutes = Math.trunc(currentTime / 60);
        const seconds = Math.floor(currentTime - (minutes * 60));
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    function setTimeLine(currentTime = 0, duration = 0) {
        trackTime.value = `${(currentTime / duration) * trackTime.max}`;
    };


}
playerScript();