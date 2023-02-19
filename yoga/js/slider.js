function slider() {
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    // отображает нужный слайд
    function showSlides(n) {
        // если слайд последний и переключаемся на следующий, то показываем первый слайд
        if (n > slides.length) {
            slideIndex = 1;
        }

        // если слайд первый и переключаемся на предыдущий, то показываем последний слайд
        if (n < 1) {
            slideIndex = slides.length;
        }

        // скрываем все слайды и прячем активную точку
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        // показываем нужный слайд и показываем нужную активную точку
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    // переключает слайды
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // показывает текущий слайд
    function currenSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    })

    next.addEventListener('click', function() {
        plusSlides(1);
    })

    // переключение слайдов по точкам
    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currenSlide(i);
            }
        }
    })

    showSlides(slideIndex);
}

module.exports = slider;
