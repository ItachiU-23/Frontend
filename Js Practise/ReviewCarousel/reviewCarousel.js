
const profiles = [
    {
        id: 1,
        name: 'Neeraj',
        job: 'JDE Developer',
        description: "A job description is a tool that explains the tasks, duties, function and responsibilities of a position. It details who performs a specific type of work, how that work is to be completed, and the frequency and the purpose of the work as it relates to the organization's mission and goals.",
        imgUrl:'https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.webp?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU='
    },

    {
        id: 2,
        name: 'Varman',
        job: 'React Developer',
        description: "A job description is a tool that explains the tasks, duties, function and responsibilities of a position. It details who performs a specific type of work, how that work is to be completed, and the frequency and the purpose of the work as it relates to the organization's mission and goals.",
        imgUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBec4HxU0KOnpK-xVr7qbCN-_ZT3zOyO1DQ&usqp=CAU'
    },
     
    {
        id: 3,
        name: 'Itachi',
        job: 'Shinobi',
        description: "A job description is a tool that explains the tasks, duties, function and responsibilities of a position. It details who performs a specific type of work, how that work is to be completed, and the frequency and the purpose of the work as it relates to the organization's mission and goals.",
        imgUrl: 'https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-250nw-1714666150.jpg'
    }
]

const author = document.getElementById('author');
const job = document.getElementById('job');
const description = document.getElementById('description');
const leftButton = document.querySelector('.btn-1');
const rightButton = document.querySelector('.btn-2');
const img = document.getElementById('person_img');
const randomProfile = document.getElementById('random_profile');

let counter = 0;


window.addEventListener('DOMContentLoaded', () => {
    review(counter);
})

function review(person) {
    const item = profiles[person];
    img.src = `${item.imgUrl}`;
    author.textContent = item.name;
    job.textContent = item.job;
    description.textContent = item.description;
}

rightButton.addEventListener('click', () => {
    counter++;
    review(counter);
})

leftButton.addEventListener('click', () => {
    counter--;
    review(counter);
})

randomProfile.addEventListener('click', ()=> {
    counter = Math.floor(Math.random() * profiles.length);
    review(counter);
})