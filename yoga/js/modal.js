function modal() {
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
}

module.exports = modal;
