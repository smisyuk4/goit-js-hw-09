// https://notiflix.github.io/
// https://github.com/notiflix/Notiflix#readme
// npm i notiflix

// 1. Напиши скрипт, який на момент сабміту форми викликає функцію 
// createPromise(position, delay) стільки разів, скільки ввели в поле amount. 
// Під час кожного виклику передай їй номер промісу(position), що створюється, 
// і затримку, враховуючи першу затримку(delay), введену користувачем, і крок(step).

// 2. Доповни код функції createPromise таким чином, щоб вона повертала один проміс, 
// який виконується або відхиляється через delay часу.
// Значенням промісу повинен бути об'єкт, в якому будуть властивості position і delay 
// зі значеннями однойменних параметрів.
// Використовуй початковий код функції для вибору того, 
// що потрібно зробити з промісом - виконати або відхилити.

// 3. Для відображення повідомлень користувачеві, замість console.log(), 
// використовуй бібліотеку notiflix.

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
  form: document.querySelector('form'),
}

refs.form.addEventListener('submit', onClickButtonCreate)

function onClickButtonCreate(event) {
  event.preventDefault();

  const delay = refs.form.elements.delay.value
  const step = refs.form.elements.step.value
  const amount = refs.form.elements.amount.value

  let time = Number(delay)
  for (let position = 1; position <= amount; position += 1) {   
    createPromise(position, time)
    time += Number(step);
  } 
}

function createPromise(position, delay) {
  const promice = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay });
      } else {
        reject({position, delay });
      }
    }, Number(delay));   
  });

  promice
  .then(({ position, delay }) => {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);         
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);         
    console.log(`❌ Rejected promise ${position} in ${delay}ms`); 
  });
}