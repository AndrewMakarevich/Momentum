async function sliderScript() {
    const host = axios.create({
        baseURL: 'https://api.github.com'
    });
    let currentPeriod;
    if (hours >= 0 && hours < 6) {
        currentPeriod = "night";
    } else if (hours >= 6 && hours < 12) {
        currentPeriod = "morning";
    } else if (hours >= 12 && hours < 18) {
        currentPeriod = "afternoon";
    } else {
        currentPeriod = "evening";
    }
    const { data } = await host.get(`/repos/AndrewMakarevich/stage1-tasks/contents/images/${currentPeriod}?ref=assets`);


    const sliderBlock = document.querySelector('.slider');
    const sliderPictures = sliderBlock.querySelectorAll('.slider-image');
    sliderPictures.forEach((img) => {
        img.remove();
    });
    let srcArray = [];
    data.forEach(img => {
        srcArray = [...srcArray, img.download_url];
    });
    srcArray.sort(() => {
        return Math.random() - Math.random();
    });
    console.log(srcArray);
    let step = 0;
    let beforestep = 1;
    function createImg(pos) {
        const img = document.createElement('img');
        img.classList.add('slider-image');
        img.src = srcArray[step];
        img.alt = "";
        img.id = step;
        if (pos === 'before') {
            img.style.left = `${-sliderBlock.clientWidth * beforestep}px`;
            sliderBlock.prepend(img);
            if (step + 1 === srcArray.length) {
                beforestep = 1;
                step = 0;
            } else {
                beforestep += 1;
                step += 1;
            }
        } else if (pos === 'after') {
            img.style.left = `${(sliderBlock.clientWidth * step) + sliderBlock.clientWidth}px`;
            sliderBlock.append(img);
            if (step + 1 === srcArray.length) {
                step = 0;
            } else step += 1;
        } else {
            img.style.left = `${sliderBlock.clientWidth * step}px`;
            sliderBlock.append(img);
            if (step + 1 > srcArray.length - 1) {
                step = 0;
            } else step += 1;
        }





    }
    srcArray.forEach(img => {
        createImg();
    });


    const leftBtn = document.querySelector('.left-btn');
    leftBtn.addEventListener('click', () => {
        moveLeft();
    });
    const rightBtn = document.querySelector('.right-btn');
    rightBtn.addEventListener('click', () => {
        moveRight();
    });

    let sliderStep = 0;

    function moveLeft() {
        if (sliderStep - 1 < 0) {
            sliderStep = srcArray.length - 1;
        } else {
            sliderStep -= 1;
        }
        let imgs = document.querySelectorAll('.slider-image');

        let appearenceBefore;
        for (let i = 0; i < imgs.length; i++) {
            if (+imgs[i].style.left.split('px')[0] < 0) {
                appearenceBefore = true;
                break;
            } else {
                appearenceBefore = false;
                continue;
            }
        }
        if (!appearenceBefore) {
            srcArray.reverse();
            srcArray.forEach(img => {
                createImg('before');
            });
            srcArray.reverse();
        }
        imgs = document.querySelectorAll('.slider-image');
        imgs.forEach(img => {
            const left = img.style.left.split('px')[0];
            img.style.left = `${+left + sliderBlock.clientWidth}px`;
        });
        if (sliderStep === srcArray.length - 1) {
            if (imgs.length > srcArray.length * 2) {
                setTimeout(() => {
                    for (let i = 0; i < srcArray.length; i++) {
                        sliderBlock.lastChild.remove();
                    }
                }, 300);
            }


        }
        console.log(sliderStep);
    }
    function moveRight() {
        if (sliderStep + 1 > srcArray.length - 1) {
            sliderStep = 0;
        } else {
            sliderStep += 1;
        }
        let imgs = document.querySelectorAll('.slider-image');

        let appearenceAfter;
        for (let i = 0; i < imgs.length; i++) {
            if (+imgs[i].style.left.split('px')[0] >= sliderBlock.clientWidth) {
                appearenceAfter = true;
                break;
            } else {
                appearenceAfter = false;
                continue;
            }
        }
        console.log(appearenceAfter);
        if (!appearenceAfter) {
            console.log('after no pic');
            srcArray.forEach(img => {
                createImg('after');
            });
        }

        imgs = document.querySelectorAll('.slider-image');
        imgs.forEach(img => {
            const left = img.style.left.split('px')[0];
            img.style.left = `${+left - sliderBlock.clientWidth}px`;
        });

        if (sliderStep === 0) {
            if (imgs.length > srcArray.length * 2) {
                setTimeout(() => {
                    for (let i = 0; i < srcArray.length; i++) {
                        sliderBlock.firstChild.remove();
                    }
                }, 300);
            }

        }
        console.log(sliderStep);
    }
};
sliderScript();