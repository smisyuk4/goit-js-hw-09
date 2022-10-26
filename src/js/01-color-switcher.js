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
    refs.buttonStart.toggleAttribute('disabled')
    refs.buttonStop.toggleAttribute('disabled')

    intervalId = setInterval(changeColorBg, 1000)
}

function onClickButtonStop() {
    refs.buttonStart.toggleAttribute('disabled')
    refs.buttonStop.toggleAttribute('disabled')

    clearInterval(intervalId)    
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorBg() {
    refs.body.style.backgroundColor = getRandomHexColor()
    
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
//         }, 1000)        

//         refs.buttons[0].toggleAttribute('disabled')
//         refs.buttons[1].toggleAttribute('disabled')
//     }

//     if (atr[1].name === 'data-stop') {
//         clearInterval(intervalId)

//         refs.buttons[0].toggleAttribute('disabled')    
//         refs.buttons[1].toggleAttribute('disabled')
//     }
// }

// function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }