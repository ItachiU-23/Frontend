const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');
const container1 = document.querySelector('.container1');
const ques1 = document.querySelector('.ques1');
const answer = document.querySelector('.answer');

btn1.addEventListener('click', () => {
    console.log('clicked!!');
    btn1.style.display = "none";
    btn2.style.display = "block";
    container1.classList.add('shadow');
    ques1.style.boxShadow = 'none';
    ques1.style.borderBottom = '1px solid gray';
    answer.style.display = 'block';
})