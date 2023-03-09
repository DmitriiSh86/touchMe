const lessons = {
    1: 'sghfgjfjfj',
    2: '78946 55477894 6554'
};

let textFuture = document.querySelector('.screen-block__future');
let textPast = document.querySelector('.screen-block__past');
let textNext = document.querySelector('.screen-block__next');

let lesson = lessons[1];

const checkNumButton = (item) => {
    return true;
}

const checkKeyAndNextLetter = (item) => {
    return ((item>95 && item<112) || (item===32));
}

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




textNext.textContent = lesson[0];
lesson = lesson.slice(1);
textFuture.textContent = lesson;

letterNext = textNext.textContent;

let nextKeyAddClass = document.getElementById(letterNext);
nextKeyAddClass.classList.add('keyboard-block__type_next-key');



document.addEventListener('keydown', function (evt) {
    if (evt.key==='Shift') {
        shiftButtonPressDown();
        document.addEventListener('keyup', function (evt){
            shiftButtonPressUp();
        });     
    }
    if (checkNumButton(evt.keyCode)) {
        if (evt.key === textNext.textContent){
            const now = document.getElementById(textNext.textContent);
            now.classList.remove('keyboard-block__type_next-key');

            textPast.textContent = textPast.textContent.concat(textNext.textContent);
            textNext.textContent = lesson[0];

            const next = document.getElementById(textNext.textContent);
            next.classList.add('keyboard-block__type_next-key');

            lesson = lesson.slice(1);        
            textFuture.textContent = lesson;
        } 
        else {        
            let errorButton = document.getElementById(evt.key);
            errorButton.classList.add('keyboard-block__type_wrong-key');   
            document.addEventListener('keyup', function (evt){
                let errorButtonRemove = document.querySelector('.keyboard-block__type_wrong-key');                
                if (errorButtonRemove !== null){            
                    errorButtonRemove.classList.remove('keyboard-block__type_wrong-key');
                }
            });     
        }    
    }
});
