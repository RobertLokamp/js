'use strict';

let money, time


// спрашивает бюджет и месяц
function start() {
    money = +prompt('Ваш бюджет на месяц?');
    time = prompt('Введите дату в формате YYYY-MM-DD');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?');
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true
}


// спрашивает о статьях расхода
function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let expenseItem = prompt('Введите обязательную статью расходов в этом месяце'),
            costOfExpenseItem = prompt('Во сколько обойдется?');
    
        if (typeof(expenseItem) === 'string' && typeof(expenseItem) != null && typeof(costOfExpenseItem) != null
            && expenseItem != '' && costOfExpenseItem != '' && expenseItem.length < 50) {
            console.log('done');
            appData.expenses[expenseItem] = costOfExpenseItem;
        } else {
            console.log ("bad result");
            i--;
        }
    };
}

chooseExpenses();

/* вариант цикла с while
let i = 0
while (i != 2) {
    let expenseItem = prompt('Введите обязательную статью расходов в этом месяце'),
    costOfExpenseItem = prompt('Во сколько обойдется?');

    if (typeof(expenseItem) === 'string' && typeof(expenseItem) != null && typeof(costOfExpenseItem) != null
        && expenseItem != '' && costOfExpenseItem != '' && expenseItem.length < 50) {
        console.log('done');
        appData.expenses[expenseItem] = costOfExpenseItem;
        i++
    } else {
        console.log ("bad result");
    }
}
*/
/* вариант цикла с do while
let i = 0
do {
    let expenseItem = prompt('Введите обязательную статью расходов в этом месяце'),
    costOfExpenseItem = prompt('Во сколько обойдется?');

    if (typeof(expenseItem) === 'string' && typeof(expenseItem) != null && typeof(costOfExpenseItem) != null
        && expenseItem != '' && costOfExpenseItem != '' && expenseItem.length < 50) {
        console.log('done');
        appData.expenses[expenseItem] = costOfExpenseItem;
        i++
    } else {
        console.log ("bad result");
    }
}
while (i != 2)
*/


// определяет необязательные расходы
function chooseOptExpenses() {
    for (let i = 1; i < 4; i++) {
        let optExpenseItem = prompt('Статья необязательных расходов?');
        appData.optionalExpenses[i] = optExpenseItem;
    }
}

chooseOptExpenses();


// рассчитывает дневной бюджет
function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    alert('Ваш дневной бюджет: ' + appData.moneyPerDay);
}

detectDayBudget();


// рассчитывает уровень достатка
function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log('Минимальный уровень достатка');
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log('Средний уровень достатка');
    } else if (appData.moneyPerDay > 2000) {
        console.log('Высокий уровень достатка');
    } else {
        console.log('Произошла ошибка');
    }
}

detectLevel();


// рассчитывает доход от депозитов
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt('Какова сумма накоплений?'),
            percent = +prompt('Под какой процент?');

        appData.monthIncome = save / 100 / 12 * percent;
        alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
    }
}

checkSavings();

console.log(appData);
