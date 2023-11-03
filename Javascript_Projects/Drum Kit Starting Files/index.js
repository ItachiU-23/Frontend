let numOfDrumButtons = document.querySelectorAll(".drum").length

for (let i = 0; i < numOfDrumButtons; i++){

    document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);

    function handleClick() {
        let buttonInnerHtml = this.innerHTML;
        makeSound(buttonInnerHtml);
        buttonAnimation(buttonInnerHtml);
        // alert(buttonInnerHtml)
    }

    
    
}

document.addEventListener('keydown', function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            let tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a":
            let tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "s":
            let tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "d":
            let tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case "j":
            let crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
        case "k":
            let kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        case "l":

            let snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
        
        
        default:
            alert("Click on a valid value.!!!");
            break;
    };

}     

function buttonAnimation(currentKey) {
    let activeKey = document.querySelector("."+currentKey);
    activeKey.classList.add("pressed");

    setTimeout(function (){
        activeKey.classList.remove("pressed");
    }, 100);
}