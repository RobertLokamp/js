'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItemInput = document.getElementsByClassName('expenses-item'),
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

expensesItemBtn.setAttribute('disabled', true);
optionalExpensesBtn.setAttribute('disabled', true);
countBudgetBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');    

    while(isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }

    appData.budget = money;
    appData.timeData = time;

    budgetValue.textContent = money.toFixed();
    yearValueInput.value = new Date(Date.parse(time)).getFullYear();
    monthValueInput.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValueInput.value = new Date(Date.parse(time)).getDay();

    expensesItemBtn.removeAttribute('disabled');
    optionalExpensesBtn.removeAttribute('disabled');
    countBudgetBtn.removeAttribute('disabled');
});

expensesItemBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItemInput.length; i++) {
        let expenseItem = expensesItemInput[i].value,
            costOfExpenseItem = expensesItemInput[++i].value;
    
        if (typeof(expenseItem) === 'string' && typeof(expenseItem) != null && typeof(costOfExpenseItem) != null
            && expenseItem != '' && costOfExpenseItem != '' && expenseItem.length < 50) {
            console.log('done');
            appData.expenses[expenseItem] = costOfExpenseItem;
            sum += +costOfExpenseItem;
        } else {
            console.log ("bad result");
            i--;
        }
        console.log(sum);
        expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 1; i <  optionalExpensesInput.length; i++) {
        let optExpenseItem =  optionalExpensesInput[i].value;
        appData.optionalExpenses[i] = optExpenseItem;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if (appData.moneyPerDay < 100) {
            levelValue.textContent= 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent= 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent= 'Высокий уровень достатка';
        } else {
            levelValue.textContent= 'Произошла ошибка';
        }
    } else {
        dayBudgetValue.textContent= 'Произошла ошибка';
    }
});

chooseIncomeInput.addEventListener('change', function() {
    let items = chooseIncomeInput.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavingsCheckbox.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSumInput.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

choosePercentInput.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumInput.value,
            percent = +choosePercentInput.value;

            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;

            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}
