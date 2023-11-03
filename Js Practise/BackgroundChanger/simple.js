const colors = ["red", "blue", "green", "grey", "orange", "violet", "rgba(234, 89, 167, 0.6)", "#d9e32f"];
const container = document.getElementById('container');
const color = document.querySelector('.color');
const button = document.getElementById('button');
const header = document.querySelector('h4');

button.addEventListener("click", ()=> {
    
    let randomNumber = Math.round(Math.random() * colors.length - 1);
    randomNumber = Math.abs(randomNumber);
    container.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];
})