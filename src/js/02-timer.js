// https://flatpickr.js.org/
// npm i flatpickr --save

// https://notiflix.github.io/
// https://github.com/notiflix/Notiflix#readme
// npm i notiflix

// 1.+ Якщо користувач вибрав дату в минулому,
// покажи window.alert() з текстом "Please choose a date in the future".

// 2.+ Якщо користувач вибрав валідну дату (в майбутньому),
// кнопка «Start» стає активною.

// 3.+ Кнопка «Start» повинна бути неактивною доти,
// доки користувач не вибрав дату в майбутньому.

// 4.+ Натисканням на кнопку «Start» починається відлік часу до обраної дати
// з моменту натискання.

// 5.+ Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду,
//  скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера,
//  показуючи чотири цифри: дні, години, хвилини і секунди
// у форматі xx: xx: xx: xx.

// 6.+ Кількість днів може складатися з більше, ніж двох цифр.

// 7.+ Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто 00:00:00:00.

// 8.+ Напиши функцію addLeadingZero(value),
// яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

// 9. ДДля відображення повідомлень користувачеві, замість window.alert(), 
// використовуй бібліотеку notiflix.

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            Notify.failure('Please choose a date in the future', {position: 'center-top'});         
        }

        if (selectedDates[0] >= new Date()) {
            refs.btnStart.removeAttribute('disabled')
        }
    },
};

const fp = flatpickr("#datetime-picker", options);

refs.btnStart.addEventListener('click', onClickButtonStart)

function onClickButtonStart() {
    refs.btnStart.toggleAttribute('disabled')    

    const intrvalId = setInterval(() => {
        const dateFromUserUnix = fp.selectedDates[0].getTime()
        const todayUnix = new Date().getTime()
        const timeToEventUnex = dateFromUserUnix - todayUnix

        const objDate = convertMs(timeToEventUnex)
        const {
            days,
            hours,
            minutes,
            seconds,
        } = objDate

        //draw markup
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);

        const sum = days + hours + minutes + seconds;
        if (sum === 0) {
            Notify.info('Congratulations! The time has come!', {position: 'center-top'});
            clearInterval(intrvalId)
        }
    }, 1000)    
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    if (value >= 10) {
        return value
    }

    return String(value).padStart(2, '0')    
}