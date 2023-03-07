const lessons = {
    1: '78946 55477894 6554',
    2: '78946 55477894 6554'
};

let textFuture = document.querySelector('.screen-block__future');
let textPast = document.querySelector('.screen-block__past');
let textNext = document.querySelector('.screen-block__next');

let lesson = lessons[1];

const checkNumButton = (item) => {
    return ((item>95 && item<112) || (item===32));
}

const checkKeyAndNextLetter = (item) => {
    return ((item>95 && item<112) || (item===32));
}


textNext.textContent = lesson[0];
lesson = lesson.slice(1);
textFuture.textContent = lesson;

letterNext = textNext.textContent;

let nextKeyAddClass = document.getElementById(letterNext);
nextKeyAddClass.classList.add('keyboard-block__type_next-key');



document.addEventListener('keydown', function (evt) {
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
