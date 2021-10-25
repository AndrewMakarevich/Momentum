function welcomeScript() {
    const welcomeBlock = document.querySelector('.welcome-block__welcoming');
    let welcomeText;
    const currentDate = new Date();
    hours = currentDate.getHours();
    if (hours >= 0 && hours < 6) {
        welcomeText = "Good night,";
    } else if (hours >= 6 && hours < 12) {
        welcomeText = "Good morning,";
    } else if (hours >= 12 && hours < 18) {
        welcomeText = "Good afternoon,";
    } else {
        welcomeText = "Good evening,";
    }
    welcomeBlock.innerText = welcomeText;
}
welcomeScript();
setInterval(() => welcomeScript(), 60 * 1000);