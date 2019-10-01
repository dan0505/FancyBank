const Account = function (name, balance) {
    this.name = name;
    this.balance = balance;
    this.deposit = function (amount) {
        this.balance = parseFloat((this.balance + amount).toFixed(2));
    };
    this.withdraw = function (amount) {
        const total = parseFloat((this.balance - amount).toFixed(2));
        if (total >= 0) {
            this.balance = total;
        }
    }
};
const Bank = function (...accounts) {
    this.accounts = accounts;
    this.addAccount = function (accountName) {
        this.accounts.push(new Account(accountName, 0));
    };
    this.deposit = function (accountName, amount) {
        const account = findAccount(this.accounts, accountName);
        account.deposit(amount);
    };
    this.withdraw = function (accountName, amount) {
        const account = findAccount(this.accounts, accountName);
        account.withdraw(amount);
    };

    function findAccount(accounts, accountName) {
        for (const account of accounts) {
            if (account.name === accountName) {
                return account;
            }
        }
        return null;
    }
};

function displayAccounts(){
    const accountList = document.getElementById('account-list');
    const accountSelect = document.getElementById('account-select');
    while (accountList.firstChild) {
        accountList.removeChild(accountList.firstChild);
    }
    while (accountSelect.firstChild) {
        accountSelect.removeChild(accountSelect.firstChild);
    }
    //creat top row for table
    const tableHead = document.createElement('tr');
    tableHead.innerHTML = `<th>Account Name</th><th>Balance(Bags of Gold)</th>`;
    tableHead.classList.add('thead-light');
    accountList.append(tableHead);
    for (const account of gringottsBank.accounts) {
        const accountElement = document.createElement('tr');
        accountElement.innerHTML = `<td>${account.name}</td><td>${account.balance}</td>`;
        accountList.append(accountElement);
        const accountOption = document.createElement('option');
        accountOption.innerHTML = `${account.name}`;
        accountSelect.append(accountOption);
    }
}

const gringottsBank = new Bank(
    new Account('Harry Potter', 300.99),
    new Account('Ron Weasley', 100.00)
);

// add account
const addAccountButton = document.getElementById('add-account');
addAccountButton.addEventListener('click', function() {
    const accountName = document.getElementById('account-name').value;
    const emptyNameAlert = document.getElementById("emptyNameAlert");
    const successAddAccountAlert = document.getElementById("successAddAccountAlert");
    if (!accountName) {
        // successAddAccountAlert.alert();
        $('.close').alert();
    } else {
        gringottsBank.addAccount(accountName);
        displayAccounts();
    }



    });

displayAccounts();


document.getElementById('deposit')
    .addEventListener('click', function(){
        const account = document.getElementById('account-select').value;
        const amount = document.getElementById('input-value').value;
        gringottsBank.deposit(account, parseFloat(amount));
        displayAccounts();
    });

document.getElementById('withdraw')
    .addEventListener('click', function(){
        const account = document.getElementById('account-select').value;
        const amount = document.getElementById('input-value').value;
        gringottsBank.withdraw(account, parseFloat(amount));
        displayAccounts();
    });