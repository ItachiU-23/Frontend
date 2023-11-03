const click = document.querySelector('.click');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const container = document.querySelector('.container');
const modal = document.getElementById('modal');

click.addEventListener('click', () => {
    container.style.visibility = "hidden";
    setTimeout(()=> {
        modal.style.visibility='visible';
    }, 500)
    
});

btn1.addEventListener('click', () => {
    modal.style.visibility = 'hidden';
    setTimeout(() => {
        container.style.visibility = 'visible';
    }, 500);
    
})