// 1. Напиши скрипт, який після натискання кнопки «Start», 
// раз на секунду змінює колір фону < body > на випадкове значення, 
// використовуючи інлайн стиль.
// Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// 2. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// 3. Для генерування випадкового кольору використовуй функцію getRandomHexColor


// Варіант №1
const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
}

let intervalId

refs.buttonStart.addEventListener('click', onClickButtonStart)
refs.buttonStop.addEventListener('click', onClickButtonStop)

function onClickButtonStart() {   
    intervalId = setInterval(changeColorBg, 1000)
}

function onClickButtonStop() {
    clearInterval(intervalId)
    refs.buttonStart.removeAttribute('disabled')
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorBg() {
    refs.body.style.backgroundColor = getRandomHexColor()
    refs.buttonStart.setAttribute('disabled', '')
}


// Варіант №2
// const refs = {
//     body: document.querySelector('body'),
//     buttons: document.querySelectorAll('button'),
// }

// let intervalId

// refs.buttons.forEach(button => {
//     button.addEventListener('click', onClickButton)
// })

// function onClickButton(event) {
//     const atr = event.target.attributes;
    
//     if (atr[1].name === 'data-start') {
//         intervalId = setInterval(function () {
//             refs.body.style.backgroundColor = getRandomHexColor()
//             event.target.setAttribute('disabled', '')
//         }, 1000)        
//     }

//     if (atr[1].name === 'data-stop') {
//         clearInterval(intervalId)
//         refs.body.style = ''
//         refs.buttons[0].removeAttribute('disabled')        
//     }
// }

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }