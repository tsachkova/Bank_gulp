let bank: Client[] = [];

class Account {
    ownMoney: number
    currency: string
    isActive: boolean
    dateActive: string
    creditMoney?: number
    limit?: number

    constructor(sum: number, currency: string, isActive: boolean, dateActive: string, creditMoney?: number, limit?: number) {
        this.currency = currency;
        this.ownMoney = sum;
        this.isActive = isActive;
        this.dateActive = dateActive;
        this.creditMoney = creditMoney;
        this.limit = limit;
    }
}

class Client {
    id: number
    firstName: string;
    lastName: string;
    isActive: boolean;
    date: string;
    debet: Account[] = [];
    credit: Account[] = [];

    constructor(firstName: string, lastName: string, isActive: boolean, id: number, date: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.date = date;

    }

    addAccount(accounts: Account[]): Client {
        for (let i = 0; i < accounts.length; i++) {

            if (accounts[i].hasOwnProperty('limit')) {

                if (accounts[i].ownMoney < 0) {
                    throw new Error("exceeded credit limit");
                }

                let creditMoney = (accounts[i].ownMoney - accounts[i].limit!) > 0 && accounts[i].limit || accounts[i].ownMoney;
                let ownMoney = accounts[i].ownMoney - accounts[i].limit!;

                this.credit.push(new Account(ownMoney, accounts[i].currency, accounts[i].isActive, accounts[i].dateActive, creditMoney, accounts[i].limit));

            } else {

                if (accounts[i].ownMoney < 0) {
                    throw new Error("debet account must be greater than zero");
                }

                this.debet.push(new Account(accounts[i].ownMoney, accounts[i].currency, accounts[i].isActive, accounts[i].dateActive));
            }
        }
        return this;
    }
}

function getSearchUserData(idClient: string) {
    for (let i = 0; i < bank.length; i++) {

        if (bank[i].id === Number(idClient)) {
            return bank[i];
        }
    }
}

function deleteUser(idDeleteUser: string | number) {
    for (let i = 0; i < bank.length; i++) {

        if (bank[i].id === Number(idDeleteUser)) {
            bank.splice(i, 1);
            return;
        }
    }
    alert('Нет клиента с таким ID')
}