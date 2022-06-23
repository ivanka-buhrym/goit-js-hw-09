const refs = {
    body: document.querySelector('body'),
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
};

const changeColor = {
    timerId: null,

    onStartClick(){
        this.timerId = setInterval(() =>{
            const color = this.getRandomHexColor();
            refs.body.style.backgroundColor = color;
            console.log(color);
            setDisabled(refs.startButton);
            removeDisabled(refs.stopButton);
        }, 1000);
    },

    onStopClick(){
        clearInterval(this.timerId);
        setDisabled(refs.stopButton);
        removeDisabled(refs.startButton);
    },

    getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    },
};

function setDisabled(event){
    event.setAttribute('disabled', 'disabled');
};

function removeDisabled(event){
    event.removeAttribute('disabled')
};

refs.startButton.addEventListener('click', () => {
    changeColor.onStartClick();
});
refs.stopButton.addEventListener('click', () => {
    changeColor.onStopClick();
});
