'use strict';

let money = prompt('Ваш бюджет на месяц?');
let time = prompt('Введите дату в формате YYYY-MM-DD');

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: '',
    income: [],
    saving: false
}

let mandatoryItemOfExpenditure1 = prompt('Введите обязательную статью расходов в этом месяце'),
    costOfMandatoryItemOfExpenditure1 = prompt('Во сколько обойдется?'),
    mandatoryItemOfExpenditure2 = prompt('Введите обязательную статью расходов в этом месяце'),
    costOfMandatoryItemOfExpenditure2 = prompt('Во сколько обойдется?');

    appData.expenses.mandatoryItemOfExpenditure1 = costOfMandatoryItemOfExpenditure1;
    appData.expenses.mandatoryItemOfExpenditure2 = costOfMandatoryItemOfExpenditure2;

alert('Ваш дневной бюджет: ' + appData.budget / 30);

console.log(appData);
