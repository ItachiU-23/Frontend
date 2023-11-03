const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photos = []

// Unsplash API
const count = 30;
const apiKey = `PxiB-jdJ4UL5lq2pL8xtGGzkZP9rmYizTu6Z1RELMZ4`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
    
}

// function to put each photos in photos array in an anchor tag usign for each
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photos.length;
    
    photos.forEach((photo)=>{
        // creating anchor tag
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // creating img element
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.urls.alt_description);
        img.setAttribute('title', photo.urls.alt_description);

        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
         photos = await response.json();
         displayPhotos()
    } catch (error) {
        // to determine the error
    }
}

// add scroll eventListener
window.addEventListener('scroll', function() {
    if (this.window.innerHeight + this.window.scrollY >= this.document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

getPhotos();