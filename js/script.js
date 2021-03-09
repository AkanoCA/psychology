'use strict'




function presentation({ // деструктуризация опций
    presentation,
    slider,
    display,
    switcher,
    buttons,
    indicators,
    indicatorActive,
    autoSlide = true,
    autoSlideDelay = 500,
}) {

    function createPresentation(presentation) { // ищем элементы DOM для каждого блока презентации

        function flipAuto() {


            flipSlide(countAutoslide);
            toggleIndicator(BUTTONS[countAutoslide].querySelector(indicators));

            (countAutoslide < BUTTONS.length - 1) ? countAutoslide++ : countAutoslide = 0;

        }

        function toggleIndicator(indicator) {
            let activeIndicator = SWITCHER.querySelector(indicatorActive);

            activeIndicator.classList.remove(indicatorActive.split('').slice(1).join(''));
            indicator.classList.add(indicatorActive.split('').slice(1).join(''));
        }

        function flipSlide(index) {
            DISPLAY.style.marginLeft = `-${SLIDER.offsetWidth * index}px`; // задаем положение дисплея относительно левого края в контейнере
        }

        function doButton(button, index) {
            let indicator = button.querySelector(indicators);

            button.addEventListener('click', function () {
                flipSlide(index); //передаем контейнер(slider) в котором расположен инлайн блок со слайдами(display) и индекс кнопки(index) для вычисления положения по формуле (ширина slider * порядковое положение кнопки index), т.о. дисплей сдвигается влево на необходимый по порядку слайд
                toggleIndicator(indicator);

                clearTimeout(startSlide);
                countAutoslide = index;
                if (autoSlide) setTimeout(() => (startSlide = setInterval(flipAuto, autoSlideDelay)), 30000)
            });
        }

        const SLIDER = presentation.querySelector(slider);
        const DISPLAY = SLIDER.querySelector(display);
        const SWITCHER = presentation.querySelector(switcher);
        const BUTTONS = SWITCHER.querySelectorAll(buttons);

        let countAutoslide = 1;
        let startSlide;

        if (autoSlide) startSlide = setInterval(flipAuto, autoSlideDelay);



        BUTTONS.forEach((item, index) => doButton(item, index)); // задаем функционал для каждой кнопки
    }

    const PRESENTATIONS = document.querySelectorAll(presentation);
    PRESENTATIONS.forEach((item) => createPresentation(item)); // для каждого блока презентации генерируем функционал
}

let presentationOptions = {
    presentation: '.presentation',
    slider: '.presentation__slider',
    display: '.presentation__display',
    switcher: '.presentation__switcher',
    buttons: '.presentation__button',
    indicators: '.presentation__indicator',
    indicatorActive: '.presentation__indicator_active',
    AutoSlide: true,
    autoSlideDelay: 4000
}

let quoteOptions = {
    presentation: '.reviews',
    slider: '.reviews__slider',
    display: '.reviews__display',
    switcher: '.reviews__pagination',
    buttons: '.reviews__button',
    indicators: '.reviews__indicator',
    indicatorActive: '.reviews__indicator_active',
    AutoSlide: true,
    autoSlideDelay: 25000
}

presentation(presentationOptions);
presentation(quoteOptions);




