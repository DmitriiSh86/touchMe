const lessons = {
    1: 'SdSDdsSDs',
    2: '111111111',
    3: 'sssssssss',
    4: '1111111111'
};

const textFuture = document.querySelector('.screen-block__future');
const textPast = document.querySelector('.screen-block__past');
const textNext = document.querySelector('.screen-block__next');
const buttonShift = document.getElementById('Shift');
let letterNext = {
    key: '',
    shiftEnable: false
};


const checkKeyAndNextLetter = (item) => {
    return ((item>95 && item<112) || (item===32));
}



const setBackgroundNextKey = (item, shift) => {
    item.classList.add('keyboard-block__type_next-key');
    
    if (shift.shiftEnable === true) {
        buttonShift.classList.add('keyboard-block__type_next-key');
    }
}

const removeBackgroundNextKey = (item, shift) => {
    item.classList.remove('keyboard-block__type_next-key');
    if (shift.shiftEnable === true) {
        buttonShift.classList.remove('keyboard-block__type_next-key');
        shift.shiftEnable = false;
    }
}
let i =1;




let lesson = setUpLesson(lessons, i);

const checkNumButton = () => {
    return lesson.length >=1;
}

const pressedKey = {};

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

const getPressedKeyObject = (item) => {
    pressedKey.shift = item.shiftKey;
    pressedKey.key = item.key;
    

    return pressedKey;
}


function handleKey (evt) {
    if (checkNumButton()) {
        if (letterNext.shiftEnable === true) {
            if ((evt.key.toLowerCase() === letterNext.key) && (evt.shiftKey === true)) {
                changeNextKey();
                console.log(letterNext.key);
            } 
            else {        
                wrongNextKey(evt.key);            
            }
        }
        else {
            if (evt.key === letterNext.key) {
                changeNextKey();
                console.log(letterNext.key);
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

function removeHandleKey() {
    document.removeEventListener("keydown", handleKey);
};

function setHandleKey() {
    document.addEventListener("keydown", handleKey);
};

function checkUpperCase(symbol) {
    if (symbol.key === symbol.key.toUpperCase()) {
    symbol.key = symbol.key.toLowerCase()
    symbol.shiftEnable = true;    
    }
    else symbol.shiftEnable = false;
    return symbol;
}

function setUpLesson(lessonsList, i) {
    setHandleKey();
    if (i <= Object.keys(lessonsList).length) {
        let lesson = lessonsList[i];
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
}