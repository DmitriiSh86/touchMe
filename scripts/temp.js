const lessons = {
    1: {
        name: '11',
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
    shiftEnable: false
};

let i =1;

let lesson = setUpLesson(lessons, i);


function setBackgroundNextKey(item, shift) {
    item.classList.add('keyboard-block__type_next-key');

    if (shift.shiftEnable === true)  {
        if (item.classList.contains('left')) {
            buttonShiftLeft.classList.add('keyboard-block__type_next-key');
        } else {
            buttonShiftRight.classList.add('keyboard-block__type_next-key');
        }
    }
};

const removeBackgroundNextKey = (item, shift) => {
    item.classList.remove('keyboard-block__type_next-key');
    if (shift.shiftEnable === true) {
        shift.shiftEnable = false;
        if (buttonShiftRight.classList.contains('keyboard-block__type_next-key')) {
            buttonShiftRight.classList.remove('keyboard-block__type_next-key');
        } else {
            buttonShiftLeft.classList.remove('keyboard-block__type_next-key');
        }        
    }
}

const checkNumButton = () => {
    return lesson.length >=0;
};

const changeNextKey = () => {
    const now = document.getElementById(letterNext.key);
    removeBackgroundNextKey(now, letterNext);
    textPast.textContent = textPast.textContent.concat(textNext.textContent);
    textNext.textContent = lesson[0];
    letterNext.key = textNext.textContent;
    checkUpperCase(letterNext);
    const next = document.getElementById(letterNext.key);
    setBackgroundNextKey(next, letterNext);
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

function removeHandleKey() {
    document.removeEventListener("keydown", handleKey);
};

function setHandleKey() {
    document.addEventListener("keydown", handleKey);
};

function handleKey (evt) {
    if (evt.key === '`') {
        const list = Array.from(document.querySelectorAll('.text'));
        list.forEach((element) => {
            element.classList.toggle('text-invisible');                       
    });
    }
    if (checkNumButton()) {
        if (letterNext.shiftEnable === true) {
            if ((evt.key.toLowerCase() === letterNext.key) && (evt.shiftKey === true)) {
                changeNextKey();
            } 
            else {        
                wrongNextKey(evt.key);            
            }
        }
        else {
            if (evt.key === letterNext.key) {
                changeNextKey();
            } 
            else {        
                wrongNextKey(evt.key);            
            } 
        }              
    } 
    else {
            const now = document.getElementById(letterNext.key);
            removeBackgroundNextKey(now, letterNext);
            i=i+1;
            lesson = setUpLesson(lessons, i);
            
            const next = document.getElementById(letterNext.key);
            setBackgroundNextKey(next, letterNext);        
    }
};

function checkLetterNext(item) {
    if ((item !== ',') && (item !== '.') && (item !== '/') && (item !== '-') && (item !== '=') && (item !== '[')
    && (item !== ']') && (item !== ';') && (item !== '*') && (item !== "'")) {
        return true;
    } else {
        return false;
    }
};

function checkUpperCase(symbol) {
    letterNext.int = Number(symbol.key[0]);
    
    if ((symbol.key === symbol.key.toUpperCase()) && (Number.isInteger(letterNext.int) !== true) && (checkLetterNext(letterNext.key) === true)) {
        symbol.key = symbol.key.toLowerCase()
        symbol.shiftEnable = true;
    }
    else {
        symbol.shiftEnable = false;
        return symbol;
    }
};

function setUpLesson(lessonsList, i) {
    setHandleKey();
    if (i <= Object.keys(lessonsList).length) {        
        let lesson = lessonsList[i].name;
        textNext.textContent = lesson[0];
        lesson = lesson.slice(1);
        textPast.textContent = '';
        textFuture.textContent = lesson;
        letterNext.key = textNext.textContent;
        checkUpperCase(letterNext);
        let nextKeyAddClass = document.getElementById(letterNext.key);
        setBackgroundNextKey(nextKeyAddClass, letterNext);
        return lesson;
    }
    else {
        removeHandleKey();
    }
};