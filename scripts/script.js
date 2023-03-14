const lessons = {
    1: {
        name: 'Ssssss',
        about: 'a particular being or thing as distinguished from a class, species, or collection'
    },
    2: {
        name: '22', 
        about: 'sharing or being those properties of something that allow it to be referred to a particular category'
    },
    3: {
        name: '33',
        about: 'a comprehensive and fundamental law, doctrine, or assumption'
    },
    4: {
        name: '44',
        about: 'a particular being or thing as distinguished from a class, species, or collection'
    },
    5: {
        name: '55', 
        about: 'sharing or being those properties of something that allow it to be referred to a particular category'
    },
    6: {
        name: '66',
        about: 'a comprehensive and fundamental law, doctrine, or assumption'
    }
    
};

const textPastOne = document.querySelector('.after-1');
const textPastTwo = document.querySelector('.after-2');
const textPastThree = document.querySelector('.after-3');
const textBeforeOne = document.querySelector('.before-1');
const textBeforeTwo = document.querySelector('.before-2');
const textBeforeThree = document.querySelector('.before-3');




const textAbout = document.querySelector('.about');
const textFuture = document.querySelector('.screen-block__future');
const textPast = document.querySelector('.screen-block__past');
const textNext = document.querySelector('.screen-block__next');
const text = document.querySelectorAll('.text');
const buttonShiftLeft = document.getElementById('Shift-left');
const buttonShiftRight = document.getElementById('Shift-right');


let letterNext = {
    key: '',
    shiftEnable: false,
    isNumber: false,
    specSymbol: false,
    last: false
};

function removeHandleKey() {
    document.removeEventListener("keydown", handleKey);
};

function setHandleKey() {
    document.addEventListener("keydown", handleKey);
};

function setBackgroundNextKey(letterNext) {
    const nextKeyAddClass = document.getElementById(letterNext.key);
    nextKeyAddClass.classList.add('keyboard-block__type_next-key');

    if (letterNext.shiftEnable === true)  {
        if (nextKeyAddClass.classList.contains('left')) {
            buttonShiftLeft.classList.add('keyboard-block__type_next-key');
        } else {
            buttonShiftRight.classList.add('keyboard-block__type_next-key');
        }
    }
};

function removeBackgroundNextKey(letterNext) {
    const now = document.getElementById(letterNext.key);
    now.classList.remove('keyboard-block__type_next-key');
    if (letterNext.shiftEnable === true) {
        letterNext.shiftEnable = false;
        if (buttonShiftRight.classList.contains('keyboard-block__type_next-key')) {
            buttonShiftRight.classList.remove('keyboard-block__type_next-key');
        } else {
            buttonShiftLeft.classList.remove('keyboard-block__type_next-key');
        }
    }
}

function compareKey(evtKey, letterNext) {
    if (letterNext.shiftEnable === true) {
        if ((evtKey.key.toLowerCase() === letterNext.key) && (evtKey.shiftKey === true)) {
            return true;
        } 
        else {        
            return false;
        }
    }
    else {
        if (evtKey.key === letterNext.key) {
            return true;
        } 
        else {        
            return false;            
        } 
    }              
}

function setUpLesson(lessonsList, i) {
    setHandleKey();
    if (i <= Object.keys(lessonsList).length) {        
        let lesson = lessonsList[i].name;
        getLetterNext(lesson);
        
        textNext.textContent = lesson[0];
        lesson = lesson.slice(1);
        textPast.textContent = '';
        textFuture.textContent = lesson;        
        setBackgroundNextKey(letterNext);
        return lesson;
    }
    else {
        removeHandleKey();
    }
};


let i = 1;
let lesson = setUpLesson(lessons, i);




function getLetterNext(lesson) {    
    letterNext.key = lesson[0];
    const num = Number(letterNext.key[0]);
    letterNext.isNumber = Number.isInteger(num);

    if ((letterNext.key !== ',') && (letterNext.key !== '.') && (letterNext.key !== '/') && (letterNext.key !== '-') && (letterNext.key !== '=') && (letterNext.key !== '[')
    && (letterNext.key !== ']') && (letterNext.key !== ';') && (letterNext.key !== '*') && (letterNext.key !== "'")) {
        letterNext.specSymbol = false;
    } else {
        letterNext.specSymbol = true;
    }
    
    if ((letterNext.key === letterNext.key.toUpperCase()) && (letterNext.isNumber !== true) && (letterNext.specSymbol !== true)) {
        letterNext.key = letterNext.key.toLowerCase()
        letterNext.shiftEnable = true;
    }
    else {
        letterNext.shiftEnable = false;
    }

    if (lesson.length === 1) {
        letterNext.last = true;
    } else {
        letterNext.last = false;
    }    
}
const changeNextKey = () => {        
        removeBackgroundNextKey(letterNext);
        textPast.textContent = textPast.textContent.concat(textNext.textContent);
        textNext.textContent = lesson[0];
        getLetterNext(lesson);
        setBackgroundNextKey(letterNext);
        lesson = lesson.slice(1);        
        textFuture.textContent = lesson;
}

const wrongNextKey = (key) => {
    if ((key === "Shift") && (letterNext.shiftEnable === true)) {

    }
    else {
    let errorButton = document.getElementById(key);
    errorButton.classList.add('keyboard-block__type_wrong-key');   
    document.addEventListener('keyup', function (evt){
        let errorButtonRemove = document.querySelector('.keyboard-block__type_wrong-key');                
        if (errorButtonRemove !== null){            
            errorButtonRemove.classList.remove('keyboard-block__type_wrong-key');
            }
        });
    }
}



function handleKey (evt) {
    if (evt.key === '`') {
        const list = Array.from(document.querySelectorAll('.text'));
        list.forEach((element) => {
            element.classList.toggle('text-invisible');                       
    });
    }

    if (compareKey(evt, letterNext) === true) {
        if (letterNext.last === false) {
            changeNextKey();
        } else {
            removeBackgroundNextKey(letterNext);
            i=i+1;
            lesson = setUpLesson(lessons, i);
            setBackgroundNextKey(letterNext);
        }
    } else {
        wrongNextKey(evt.key);
    }
};