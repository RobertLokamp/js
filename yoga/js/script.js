window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tabs = require('./tabs.js'),
        timer = require('./timer.js'),
        modal = require('./modal.js'),
        form = require('./form.js'),
        slider = require('./slider.js'),
        calc = require('./calc.js');

    tabs();
    timer();
    modal();
    form();
    slider();
    calc();
});
