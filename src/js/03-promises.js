import Notiflix from 'notiflix';
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const delay = parseInt(form.delay.value);
    const step = parseInt(form.step.value);
    const amount = parseInt(form.amount.value);
    
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, step * (i - 1) + delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
    

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({position, delay});
        } else {
          reject({position, delay});
        }
      }, delay);
    });
  }
