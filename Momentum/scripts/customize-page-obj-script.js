function settings() {

}

function customizeObj() {
    const customizibleObjs = document.querySelectorAll('.customizible');
    const settingsPanel = document.querySelector('.customize-page-obj');
    const customizeObjList = settingsPanel.querySelector('.obj-list');
    // localStorage.removeItem("page-obj-visibility");
    let settings = JSON.parse(localStorage.getItem("page-obj-visibility"));

    function createCheckbox(obj, title) {

        const li = document.createElement('li');
        li.classList.add('obj-item');

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = title;
        checkBox.addEventListener('change', (e) => {
            if (checkBox.checked) {
                if (!settings) {
                    settings = {};
                }
                settings[title] = true;
                localStorage.setItem("page-obj-visibility", JSON.stringify(settings));
                obj.classList.remove('invisible');
                console.log(JSON.parse(localStorage.getItem("page-obj-visibility")));
            } else {
                if (!settings) {
                    settings = {};
                }
                settings[title] = false;
                localStorage.setItem("page-obj-visibility", JSON.stringify(settings));
                obj.classList.add('invisible');
                console.log(JSON.parse(localStorage.getItem("page-obj-visibility")));
            }
        });
        if (!settings) {
            checkBox.checked = true;
        } else {
            if (settings[title] != null || settings[title] != undefined) {
                console.log(settings[title]);
                checkBox.checked = settings[title];
                settings[title] === true ? null : obj.classList.add('invisible');
            } else {
                console.log('no settings');
                checkBox.checked = true;
            }

        }
        const checkBoxTitle = document.createElement('label');
        checkBoxTitle.innerText = title;
        checkBoxTitle.for = title;
        li.append(checkBoxTitle);
        li.append(checkBox);
        customizeObjList.append(li);

    }

    customizibleObjs.forEach(obj => {
        createCheckbox(obj, obj.dataset.settingsName);
    });
}
customizeObj();