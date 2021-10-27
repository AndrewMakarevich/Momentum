function saveUserName() {
    const userNameInput = document.querySelector('.welcome-block__author-input');
    const user_name = localStorage.getItem('user_name');
    if (user_name) {
        if (user_name.split(' ').join('').length === 0) {
            localStorage.removeItem('user_name');
        } else {
            console.log(user_name.length);
            console.log('here');
            userNameInput.value = user_name;
            userNameInput.size = userNameInput.value.length;
        }
    }
    userNameInput.oninput = function () {
        userNameInput.size = userNameInput.value.length;
        localStorage.setItem('user_name', userNameInput.value);
    };

}
saveUserName();