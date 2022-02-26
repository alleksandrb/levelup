"use strict"


// -----------header
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    const main = document.querySelector('.main');
    const header = document.querySelector('.header');
    if (scrollDistance > lastScrollTop && scrollDistance > header.offsetHeight) {
        header.classList.add('_move');
        main.style.marginTop = null;
    }
    else if (scrollDistance === 0) {
        header.classList.remove('_move');
        main.style.marginTop = null;

    }
    else {
        header.classList.remove('_move');
        // main.style.marginTop = `${header.offsetHeight}px`;
    }
    lastScrollTop = scrollDistance;
})


// ---------------burger
const headerBurger = document.querySelector('.header__burger');
if (headerBurger) {
    const popup = document.querySelector('.popup');
    headerBurger.addEventListener('click', () => {
        document.body.classList.toggle('_lock');
        popup.classList.toggle('_active');
        headerBurger.classList.toggle('_active');
        const main = document.querySelector('.main');
        main.addEventListener('click', () => {
            popup.classList.remove('_active');
            headerBurger.classList.remove('_active');
            document.body.classList.remove('_lock');

        })
        const footer = document.querySelector('.footer');
        footer.addEventListener('click', () => {
            popup.classList.remove('_active');
            headerBurger.classList.remove('_active');
            document.body.classList.remove('_lock');

        })
        const popupItem = document.querySelectorAll('.popup__item');
        for (let i = 0; i < popupItem.length; i++) {
            popupItem[i].addEventListener('click', () => {
                popup.classList.remove('_active');
                headerBurger.classList.remove('_active');
                document.body.classList.remove('_lock');
            })
        }
    })
}

// 0-----------------------slider

const client = document.querySelectorAll('.slider__client');
const sliderLine = document.querySelector('.slider__line');
let count = 0;
let width;

function init() {
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * client.length + 'px';
    for (let i = 0; i < client.length; i++) {
        client[i].style.width = width + 'px';
    }
    rollSlider();
}

window.addEventListener('resize', init);
init();

const leftButton = document.querySelector('.slider__button-left');
const rightButton = document.querySelector('.slider__button-right');

leftButton.addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = client.length - 1;
    }
    rollSlider();
});
rightButton.addEventListener('click', function () {
    count++;
    if (count >= client.length) {
        count = 0;
    }
    rollSlider();
});

function autoSlide() {
    count++;
    if (count >= client.length) {
        count = 0;
    }
    rollSlider();
    let clear = setTimeout(autoSlide, 4000);

    leftButton.addEventListener('click', function () {
        clearTimeout(clear);
    });
    rightButton.addEventListener('click', function () {
        clearTimeout(clear);
    });
}

setTimeout(autoSlide, 4000);

function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}

// ----------------------timer
let minutes = 29;
let seconds = 60;
const time = document.querySelector('.order__timer span');
function timer() {
    if (seconds == 0) {
        minutes -= 1;
        seconds = 60;
    }
    if (minutes < 0) {
        seconds = 60;
        minutes = 29;
    }

    seconds -= 1;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10 && seconds == 59) {
        minutes = '0' + minutes;
    }
    time.innerHTML = `${minutes} : ${seconds}`;
    setTimeout(timer, 1000);
}
timer();

// ------------input
const inputPhone = document.querySelector('.order__phone input');
inputPhone.value = 'Телефон';
inputPhone.addEventListener('click', () => {
    if (inputPhone.value == 'Телефон') inputPhone.value = '';

    document.querySelector('.order__phone-hint').style.opacity = '1';
})
inputPhone.addEventListener('blur', () => {
    if (inputPhone.value == '') inputPhone.value = 'Телефон';
    document.querySelector('.order__phone-hint').style.opacity = '0';

})
let out = '';
inputPhone.addEventListener('input', () => {
    if (!Number.isNaN(+inputPhone.value)) {
        out = inputPhone.value;
    }
    else {
        inputPhone.value = out;
    }
    inputPhone.value = out;
})

const inputName = document.querySelector('.order__name input');
inputName.value = 'Ф.И.О.';
inputName.addEventListener('click', () => {
    if (inputName.value == 'Ф.И.О.') inputName.value = '';
    document.querySelector('.order__name-hint').style.opacity = '1';
})
inputName.addEventListener('blur', () => {
    if (inputName.value == '') inputName.value = 'Ф.И.О.';
    document.querySelector('.order__name-hint').style.opacity = '0';
})
