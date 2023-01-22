window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);
    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Таймер

    // срок действия акции
    let deadline = '2023-01-13';

    // возвращает разницу между сроком действия акии и временем сейчас
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = document.querySelector('.hours'),
            minutes = document.querySelector('.minutes'),
            seconds = document.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        // обновляет время на странице
        function updateClock() {
            let t = getTimeRemaining(endtime);

            // чтобы дата показывалась в формате 00:00:00
            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);

    // Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelector('.description-btn');

    function openModal() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        // отключаем скролл страницы при открытой модалке
        document.body.style.overflow = 'hidden';
    };

    more.addEventListener('click', function() {
        openModal.call(this);
    });
    
    descriptionBtn.addEventListener('click', function() {
        openModal.call(this);
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // Форма
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        // останавливаем перезагрузку страницы
        event.preventDefault();

        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        //  в случае если отправлять на сервер данные как есть 
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //  в случае если отправлять на сервер данные в виде json
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        // пребразование данных из формы в json
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        
        request.send(json);

        // выводим статус сообщение после отправки формы
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }

            // очищаем форму после сабмита
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });

    });


    /* TODO: надо доразобраться
    // Контактная форма
let message2 = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

    let contactForm = document.getElementById('form');

    //let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    contactForm.addEventListener('submit', function(event) {
        // останавливаем перезагрузку страницы
        event.preventDefault();

        contactForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        //  в случае если отправлять на сервер данные как есть 
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        //  в случае если отправлять на сервер данные в виде json
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(contactForm);

        // пребразование данных из формы в json
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        
        request.send(json);

        // выводим статус сообщение после отправки формы
        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message2.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message2.success;
            } else {
                statusMessage.innerHTML = message2.failure;
            }

            // очищаем форму после сабмита
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    });

    */
});
