function saveUserName() {
    const userNameInput = document.querySelector('.welcome-block__author-input');
    const user_name = localStorage.getItem('user_name');
    if (user_name) {
        userNameInput.value = user_name;
    }
    userNameInput.oninput = function () {
        localStorage.setItem('user_name', userNameInput.value);
    };

}
saveUserName();