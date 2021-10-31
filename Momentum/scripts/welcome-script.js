import { translateVocabulary } from './translate.js';

function welcomeScript() {
    const welcomeBlock = document.querySelector('.welcome-block__welcoming');
    const hash = window.location.hash.substr(1);
    const welcomeTranslation = translateVocabulary["welcome"];
    let welcomeText;
    const currentDate = new Date();
    hours = currentDate.getHours();
    if (hours >= 0 && hours < 6) {
        welcomeText = `translate-welcome-night`;
    } else if (hours >= 6 && hours < 12) {
        welcomeText = `translate-welcome-morning`;
    } else if (hours >= 12 && hours < 18) {
        welcomeText = `translate-welcome-afternoon`;
    } else {
        welcomeText = `translate-welcome-evening`;
    }
    welcomeBlock.classList.add(welcomeText);
}
welcomeScript();
setInterval(() => welcomeScript(), 60 * 1000);