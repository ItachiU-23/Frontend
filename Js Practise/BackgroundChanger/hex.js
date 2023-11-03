const colorCode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

const button = document.getElementById('button');
const color = document.querySelector('.color');
const container = document.getElementById('container');

button.addEventListener('click', ()=> {
    let hexCode = '#';
    console.log(hexCode.length);
    for (let len = 0; len <= 5; len++) {
        hexCode += colorCode[Math.abs(Math.round(Math.random() * colorCode.length))];

    }
    container.style.backgroundColor = hexCode;
    color.textContent = hexCode;

});
