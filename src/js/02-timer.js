// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import Notiflix from 'notiflix';

// const refs = {
//     inputField: document.querySelector('#datetime-picker'),
//     buttonStart: document.querySelector('[data-start]'),
//     counterDays: document.querySelector('[data-days]'),
//     counterHours: document.querySelector('[data-hours]'),
//     counterMinutes: document.querySelector('[data-minutes]'),
//     counterSeconds: document.querySelector('[data-seconds]'),
// };
// let timerId = null;

// refs.buttonStart.setAttribute('disabled', '');
// refs.buttonStart.addEventListener('click', onStartClickInit);

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose: function (selectedDates) {
//     if (selectedDates[0].getTime() < Date.now()) {
//         refs.buttonStart.setAttribute('disabled', '');
//         return Notiflix.Notify.failure('Please choose a date in the future');
//     }
//         refs.buttonStart.removeAttribute('disabled');
//         Notiflix.Notify.success(`Congratulations, You choose date in the future`);
//         },
// };

// flatpickr('#datetime-picker', options);

// function onStartClickInit() {
//     timerId = setInterval(eventTimeCounter, 1000);
//     refs.buttonStart.setAttribute('disabled', '');
// }

// function eventTimeCounter() {
//     const date = new Date(refs.inputField.value);
//     const convertedData = convertMs(date - Date.now());
//     if (date < Date.now()) {
//     clearInterval(timerId);
//     refs.buttonStart.removeAttribute('disabled');
//     return eventTimer();
//     }
//     timer(convertedData);
// }

// function timer(time = {days, hours, minutes, seconds}) {
//     refs.counterDays.textContent = `${time.days}`;
//     refs.counterHours.textContent = `${time.hours}`;
//     refs.counterMinutes.textContent = `${time.minutes}`;
//     refs.counterSeconds.textContent = `${time.seconds}`;
// }

// function addLeadingZero(value) {
//     return value.toString().padStart(2, 0);
// }

// function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const days = addLeadingZero(Math.floor(ms / day));
//     const hours = addLeadingZero(Math.floor((ms % day) / hour));
//     const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//     const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
//     return { days, hours, minutes, seconds };
// }


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// =====
const body = document.querySelector('body')
const field = document.querySelector('.field');
const timer = document.querySelector('.timer');
const start = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker')

const data = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

const timerSeconds = 1000;
// =====

let difference = 0;
start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
      difference = new Date(selectedDates).getTime() - new Date().getTime();
      if (difference > 0) {
          start.disabled = false;
      } else {
      Notiflix.Notify.failure("Please choose a date in the future")
      start.disabled=true
    }
  },
};

flatpickr(input, options);

function updateFormat( days, hours, minutes, seconds ) {
    data.days.textContent = days;
    data.hours.textContent = hours;
    data.minutes.textContent = minutes;
    data.seconds.textContent = seconds;
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = timerSeconds;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
};



function timeToWrite() {
    let timerId = setInterval(() => {
        difference = difference - timerSeconds;
        const {days,hours,minutes,seconds} = convertMs(difference);
        updateFormat(days, hours, minutes, seconds);
            if (difference < timerSeconds) {
                clearInterval(timerId);
        }
    }, 1000);
}

start.addEventListener("click", () => {
    timeToWrite()
    start.disabled = true
});

data.days.style.backgroundColor = "coral";
data.hours.style.backgroundColor = "orange";
data.minutes.style.backgroundColor = "yellow";
data.seconds.style.backgroundColor = "teal";