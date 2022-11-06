'use strict';

let startBtn = document.getElementById('start'),
    valueClasses = document.querySelectorAll('[class*="value"]'),
    expensesItemInput = document.getElementsByClassName('.expenses-item'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesInput = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncomeInput = document.querySelector('.choose-income'),
    checkSavingsCheckbox = document.querySelector('#savings'),
    chooseSumInput = document.querySelector('.choose-sum'),
    choosePercentInput = document.querySelector('.choose-percent'),
    yearValueInput = document.querySelector('.year-value'),
    monthValueInput = document.querySelector('.month-value'),
    dayValueInput = document.querySelector('.day-value');


let money, time;


// спрашивает бюджет и месяц
function start() {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: true,
    chooseExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let expenseItem = prompt('Введите обязательную статью расходов в этом месяце', ''),
                costOfExpenseItem = prompt('Во сколько обойдется?', '');
        
            if (typeof(expenseItem) === 'string' && typeof(expenseItem) != null && typeof(costOfExpenseItem) != null
                && expenseItem != '' && costOfExpenseItem != '' && expenseItem.length < 50) {
                console.log('done');
                appData.expenses[expenseItem] = costOfExpenseItem;
            } else {
                console.log ("bad result");
                i--;
            }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert('Ваш дневной бюджет: ' + appData.moneyPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?', ''),
                percent = +prompt('Под какой процент?', '');
    
            appData.monthIncome = save / 100 / 12 * percent;
            alert('Доход в месяц с вашего депозита: ' + appData.monthIncome);
        }
    },
    chooseOptExpenses: function() {
        for (let i = 1; i < 4; i++) {
            let optExpenseItem = prompt('Статья необязательных расходов?', '');
            appData.optionalExpenses[i] = optExpenseItem;
        }
    },
    chooseIncome: function() {
        let items = prompt('Что принесёт дополнительный доход? (перечислите через запятую)', '');
        while(typeof(items) != 'string' || items == '' || items == null) {
            items = prompt('Что принесёт дополнительный доход? (перечислите через запятую)', '');
        }

        appData.income = items.split(', ');
        appData.income.push(prompt('Может что-то ещё?', ''));
        appData.income.sort();

        appData.income.forEach(function(itemOfMassive, indexOfMasive) {
            console.log('Способы доп. заработка: ' + (indexOfMasive + 1) + ' - ' + itemOfMassive);
        });
    }
};


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


for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}
