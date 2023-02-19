function form() {
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

        let formData = new FormData(form);

        function postData(data) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();
                request.open('POST', 'server.php');
                //  в случае если отправлять на сервер данные как есть: 
                // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
                //  в случае если отправлять на сервер данные в виде json:
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                // пребразование данных из формы в json
                let obj = {};
                formData.forEach(function(value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);

                // выводим статус сообщение после отправки формы
                request.addEventListener('readystatechange', function() {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
                request.send(json);
            });
        }

        // очищаем форму после сабмита
        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(formData)
            .then(()=> statusMessage.innerHTML = message.loading)
            .then(()=> statusMessage.innerHTML = message.success)
            .catch(()=> statusMessage.innerHTML = message.failure)
            .then(clearInput());
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
}

module.exports = form;
