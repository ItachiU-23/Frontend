const decrease = document.getElementById('decrease');
const increase = document.getElementById('increase');
const reset = document.getElementById('reset');

const display = document.getElementById('display');

let counter = 0;

increase.addEventListener('click', ()=> {
    counter += 1;
    display.textContent = counter;
});

decrease.addEventListener('click', ()=> {
    counter -= 1;
    display.textContent = counter;
});

reset.addEventListener('click', ()=> {
    counter = 0;
    display.textContent = counter;
});

