const shiftButtonPressDown = () => {
    let buttonAll = document.querySelectorAll('.keyboard-block__letter');
    let buttonAllList = Array.from(buttonAll);
    buttonAllList.forEach(element => {
        element.textContent = element.textContent.toUpperCase()
    });
}

const shiftButtonPressUp = () => {
    let buttonAll = document.querySelectorAll('.keyboard-block__letter');
    let buttonAllList = Array.from(buttonAll);
    buttonAllList.forEach(element => {
        element.textContent = element.textContent.toLowerCase()
    });
}


if (evt.key==='Shift') {
    shiftButtonPressDown();
    document.addEventListener('keyup', function (evt){
        shiftButtonPressUp();
    });     
}