function settingsModalScript() {
    const openBtn = document.querySelector('.page-settings-btn');
    modalWindow = document.querySelector('.page-settings-modal');
    closeBtn = document.querySelector('.page-settings-closeBtn');
    function hideModalByEsc(e) {
        if (e.key = 'Escape') {
            modalWindow.classList.add('unactiveModal');
            window.removeEventListener('keyup', hideModalByEsc);
        }
    }
    openBtn.addEventListener('click', () => {
        modalWindow.classList.remove('unactiveModal');
        window.addEventListener('keyup', hideModalByEsc);
    });
    closeBtn.addEventListener('click', () => {
        modalWindow.classList.add('unactiveModal');
        window.removeEventListener('keyup', hideModalByEsc);
    });
}
settingsModalScript();