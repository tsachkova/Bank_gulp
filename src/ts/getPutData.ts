let editedClientGetPut: GetPutClientData | null;

interface ClientBaseData {
    firstName: string;
    lastName: string;
    isActive: boolean;
    date: string;
    id: number;
}

interface EditedClientData extends ClientBaseData {
    debet: Account[];
    credit: Account[];
}

interface NewClientData extends ClientBaseData {
    accounts: Account[];
}

class GetPutClientData {
    clientData?: EditedClientData;
    idEditClient!: string | number;
    dateEditClient!: string;
    constructor(clientData?: EditedClientData) {
        this.clientData = clientData;


    }
    putEditedClientData() {
        if (!this.clientData) {
            alert('в базе нет клиента c таким id');
            returnStartForm();
            return;
        }
        this.idEditClient = this.clientData.id;
        this.dateEditClient = this.clientData.date;
        (<HTMLInputElement>document.getElementById('firstName')!).value = this.clientData.firstName;
        (<HTMLInputElement>document.getElementById('lastName'))!.value = this.clientData.lastName;

        if (this.clientData.isActive) {
            document.getElementById('isActive')!.setAttribute('checked', `checked`);
        }

        document.getElementById('idEditClient')!.textContent += `${this.clientData.id}`;
        document.getElementById('dateEditClient')!.textContent += `${this.clientData.date}`;

        let debetAccountForms = document.getElementById('debet')!;

        for (let i = 0; i < this.clientData.debet.length; i++) {
            new Accounts({ bankAcountsData: this.clientData.debet[i] }, debetAccountForms).generateAccountsForm().putAccountsData();
        }

        let creditAccountForms = document.getElementById('credit')!;

        for (let i = 0; i < this.clientData.credit.length; i++) {
            new Accounts({ bankAcountsData: this.clientData.credit[i] }, creditAccountForms).generateAccountsForm().putAccountsData();
        }
    }


    getClientData() {

        let firstName = (<HTMLInputElement>document.getElementById('firstName')!).value;
        let lastName = (<HTMLInputElement>document.getElementById('lastName')!).value;

        if (!(firstName && lastName)) {
            alert('введите имя и фамилию');
            (<HTMLInputElement>document.getElementById('firstName')!).value = '';
            (<HTMLInputElement>document.getElementById('lastName')!).value = '';
            return;
        }

        let isActive = (<HTMLInputElement>document.getElementById('isActive')!).checked;

        let date: string = '';

        if (this.dateEditClient) {
            date = this.dateEditClient;
        } else {
            let dateArrey = new Date().toString().match(/[A-Za-z]{3}\s\d\d\s\d{4}/);
            if (dateArrey !== null)
                date = dateArrey[0];
        }

        let id = 1;
        if (this.idEditClient) {
            id = Number(this.idEditClient);
        } else {
            for (let i = 0; i < bank.length; i++) {
                if (id <= bank[i].id) {
                    id = bank[i].id + 1;
                }
            }
        }

        let accountsDebet = document.getElementById('debet')!.getElementsByTagName('fieldset');
        let accountsCredit = document.getElementById('credit')!.getElementsByTagName('fieldset');
        let accounts: Account[] = [];

        for (let i = 0; i < accountsDebet.length; i++) {
            let newAccount = new Accounts({ accountsForm: accountsDebet[i] }).getAccountsData();

            if (newAccount) {
                accounts.push(newAccount);
            }

        }
        for (let i = 0; i < accountsCredit.length; i++) {
            let newAccount = new Accounts({ accountsForm: accountsCredit[i] }).getAccountsData();

            if (newAccount) {
                accounts.push(newAccount);
            }
        }
        let newClientData: NewClientData = {
            firstName,
            lastName,
            isActive,
            date,
            id,
            accounts
        }

        return newClientData;
    }

    deleteOldUserData() {
        deleteUser(Number(this.idEditClient));
        return this;
    }
}



class Accounts {
    accountForm?: HTMLElement;
    accountsContainer?: HTMLElement;
    bankAcountsData?: Account;
    constructor(accountData: { accountsForm?: HTMLElement, bankAcountsData?: Account; }, accountContainer?: HTMLElement,) {
        this.accountForm = accountData.accountsForm;
        this.accountsContainer = accountContainer;
        this.bankAcountsData = accountData.bankAcountsData;
    }

    generateAccountsForm() {
        if (this.accountsContainer) {
            if ((this.bankAcountsData) && (this.bankAcountsData.limit || this.bankAcountsData.limit === 0)) {
                new addHtmlForm(this.accountsContainer, debitDataHtml, creditAccountFormCallback).createFragment().addFragment();
            } else {
                new addHtmlForm(this.accountsContainer, debitDataHtml).createFragment().addFragment();
            }
        }
        return this;
    }

    putAccountsData() {
        if ((this.bankAcountsData) && (this.accountsContainer)) {
            let carrentAccountContainer = this.accountsContainer.lastElementChild;

            if (this.bankAcountsData.limit || this.bankAcountsData.limit === 0) {
                (<HTMLInputElement>carrentAccountContainer!.querySelector('.limit')).value = this.bankAcountsData.limit.toString();
                (<HTMLInputElement>carrentAccountContainer!.querySelector('.ownSum')).value = (this.bankAcountsData.limit + this.bankAcountsData.ownMoney).toString();
            } else {
                (<HTMLInputElement>carrentAccountContainer!.querySelector('.ownSum')).value = this.bankAcountsData.ownMoney.toString();
            }

            if (this.bankAcountsData.isActive) {
                carrentAccountContainer!.querySelector('.isActive')!.setAttribute('checked', `checked`);
            }

            carrentAccountContainer!.querySelector('.currency')!.closest('p')!.innerHTML = `
            <p><label for="currency" >валюта счета</label>
            <select class = "currency" size="1">
                <option selected  value= ${this.bankAcountsData.currency}>${this.bankAcountsData.currency}</option>
            </select></p>`;
        }
    }

    getAccountsData() {
        if (this.accountForm) {
            let ownSum: number = Number((<HTMLInputElement>this.accountForm.querySelector('.ownSum')!).value) || 0;

            let accountData: Account = {
                currency: (<HTMLInputElement>this.accountForm.querySelector('.currency'))!.value,
                ownMoney: ownSum,
                isActive: (<HTMLInputElement>this.accountForm.querySelector('.isActive'))!.checked,
                dateActive: new Date().toString(),
            }

            if (this.accountForm.querySelector('.limit')) {
                accountData.limit = +(<HTMLInputElement>this.accountForm.querySelector('.limit')!).value || 0;
            }

            return accountData;
        }
    }
}

function putCalculateData(calculateData, calculateCarrency) {
    let fieldArrey = document.querySelector('fieldset')!.querySelectorAll('input');
    for (let i = 0; i < fieldArrey.length; i++) {

        if (fieldArrey[i].type === 'text') {
            fieldArrey[i].previousSibling!.textContent += calculateCarrency;
            fieldArrey[i].value = calculateData[fieldArrey[i].id];
        }
    }
}
