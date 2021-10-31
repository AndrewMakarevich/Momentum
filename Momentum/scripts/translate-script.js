import { langArray } from './translate.js';
import { translateVocabulary } from './translate.js';

function changeUrlLanguage() {
    const languageList = document.querySelector('.select-language-list');
    let hash = localStorage.getItem('language');
    if (hash) {
        console.log(hash);
        window.location.hash = hash;
        // location.href = `${window.location.pathname}#${hash}`;
    } else {
        window.location.hash = 'eng';
    }

}
function changeLanguage() {
    const languageList = document.querySelector('.select-language-list');
    let hash = window.location.hash.substr(1);
    langArray.forEach(lang => {
        let option = document.createElement('option');
        option.innerText = lang;
        option.classList.add('.select-language-item');
        if (hash.includes(lang)) {
            option.selected = true;
            languageList.append(option);
        } else {
            languageList.append(option);
        }
    });
    languageList.oninput = (e) => {
        location.href = `${window.location.pathname}#${e.target.value}`;
        localStorage.setItem('language', e.target.value);
    };

}
function translatePage() {
    let hash = window.location.hash.substr(1);
    for (let section in translateVocabulary) {
        for (let params in translateVocabulary[section]) {
            const objToTranslate = document.querySelector(`.translate-${section}-${params}`);
            console.log(`.translate-${section}-${params}`);
            if (objToTranslate) {
                objToTranslate.innerText = translateVocabulary[section][params][hash];
            } else {
            }

        }

    }
}
window.addEventListener('hashchange', () => {
    location.reload();
    translatePage();

});

changeUrlLanguage();
changeLanguage();
translatePage();

