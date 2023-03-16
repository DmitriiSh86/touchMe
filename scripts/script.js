const lessons = {
    1: 'sharing or being those properties',
    2: 'that allow it to be referred',
    3: 'a comprehensive and fundamental law',
    4: 'a particular being or thing',
    5: 'from a class, species, or collection',
    6: 'a comprehensive and fundamental law',
    
};

const textAfterOne = document.querySelector('.after-1');
const textAfterTwo = document.querySelector('.after-2');
const textAfterThree = document.querySelector('.after-3');
const textBeforeOne = document.querySelector('.before-1');
const textBeforeTwo = document.querySelector('.before-2');
const textBeforeThree = document.querySelector('.before-3');

const len = Object.keys(lessons).length;

function setStringOne(lessonList){
    textAfterOne.textContent = lessonList[2];
    textAfterTwo.textContent = lessonList[3];
    textAfterThree.textContent = lessonList[4];
}

function setStringTwo(lessonsList){
    textBeforeOne.textContent = lessonsList[1];
    textAfterOne.textContent = '';
}

function setStringThree(lessonsList){
    textBeforeTwo.textContent = lessonsList[2];
    textAfterTwo.textContent = '';
}

function setStringFour(lessonsList){
    textBeforeThree.textContent = lessonsList[3];
    textAfterThree.textContent = '';
}

function setStringOther(lessonsList, i){
    textBeforeOne.textContent = lessonsList[i - 3];
    textBeforeTwo.textContent = lessonsList[i - 2];
    textBeforeThree.textContent = lessonsList[i - 1];
}

function changeString(lessonsList, i){
        if (i === 1) {
            setStringOne(lessonsList)
        };
        if (i === 2) {
            setStringTwo(lessonsList)
        };
        if (i === 3) {
            setStringThree(lessonsList)
        };
        if (i === 4) {
            setStringFour(lessonsList)
        };
        if (i > 4) {
            setStringOther(lessonsList, i);
        };
}

function theEnd() {
    textBeforeOne.textContent = '';
    textBeforeTwo.textContent = '';
    textBeforeThree.textContent = '';
    textNext.textContent = '';
    textPast.textContent = '';
    textFuture.textContent = 'The end!';
}




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
        changeString(lessonsList, i)      
        let lesson = lessonsList[i];
        getLetterNext(lesson);
        console.log(i); 
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
    if ((key.key === "Shift") && (letterNext.shiftEnable === true)) {

    }
    else {
        if (key.key === "Shift") {
            if (key.code === 'ShiftLeft') {
                buttonShiftLeft.classList.add('keyboard-block__type_wrong-key');
            } else {
                buttonShiftRight.classList.add('keyboard-block__type_wrong-key');
            }
        } else {
            const errorButton = document.getElementById(key.key);
            errorButton.classList.add('keyboard-block__type_wrong-key');            
        }
    }
    document.addEventListener('keyup', function (evt){
        const errorButtonRemove = document.querySelector('.keyboard-block__type_wrong-key');                
        if (errorButtonRemove !== null){            
            errorButtonRemove.classList.remove('keyboard-block__type_wrong-key');
            }
        });
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
            if (i !== len) {
                i=i+1;
                lesson = setUpLesson(lessons, i);
            } else {
                theEnd();
                removeHandleKey();
            }
        }
    } else {
        wrongNextKey(evt);
    }
};