
console.log(document.body)
document.body.append(document.createElement('form'));
let mainForm = document.querySelector('form')!;
console.log(mainForm)
mainForm.id = 'mainForm';

let startParents = document.querySelector('form') as HTMLElement;
new addHtmlForm(startParents, startHtmlData).createFragment().addSelectOption().addFragment();

listiners();

function listiners() {
    document.body.addEventListener('click', function (event) {
        if (event.target) {
            if ((<HTMLInputElement>event.target).id === "createUser") {
                clearParents(document.querySelector('#mainForm')!);
                new addHtmlForm(document.querySelector('#mainForm')!, createUserData, createFormCallback).createFragment().addFragment();
            }

            if ((<HTMLInputElement>event.target).id === "submit") {
                let newClientData: NewClientData | undefined;
                if (editedClientGetPut) {
                    newClientData = editedClientGetPut.deleteOldUserData().getClientData();
                    editedClientGetPut = null;
                } else {
                    newClientData = new GetPutClientData().getClientData();
                }
                if (!newClientData) {
                    return;
                }
                bank.push(new Client(newClientData.firstName, newClientData.lastName, newClientData.isActive, newClientData.id, newClientData.date).addAccount(newClientData.accounts));
                returnStartForm();
            }

            if ((<HTMLInputElement>event.target).classList.contains("deleteAccount")) {
                (<HTMLInputElement>event.target).closest("fieldset")!.outerHTML = "";
            }

            if ((<HTMLInputElement>event.target).id === "debitAccount") {
                new addHtmlForm(document.querySelector('#debet')!, debitDataHtml).createFragment().addSelectOption().addFragment();
            }

            if ((<HTMLInputElement>event.target).id === "creditAccount") {
                new addHtmlForm(document.querySelector('#credit')!, debitDataHtml, creditAccountFormCallback).createFragment().addSelectOption().addFragment();
            }

            if ((<HTMLInputElement>event.target).id === "editUser") {
                clearParents(document.querySelector('#mainForm')!);
                new addHtmlForm(document.querySelector('#mainForm')!, searchDataHtml).createFragment().addFragment();
            }

            if ((<HTMLInputElement>event.target).id === "search") {
                let searchUserData = getSearchUserData((<HTMLInputElement>document.querySelector('#id')!).value);
                clearParents(document.querySelector('#mainForm')!);
                new addHtmlForm(document.querySelector('#mainForm')!, editUserDataHtml, editFormCallback).createFragment().addFragment();
                editedClientGetPut = new GetPutClientData(searchUserData);
                editedClientGetPut.putEditedClientData();
            }

            if ((<HTMLInputElement>event.target).id === "back") {
                returnStartForm();
            }

            if ((<HTMLInputElement>event.target).id === "deleteUser") {
                clearParents(document.querySelector('#mainForm')!);
                new addHtmlForm(document.querySelector('#mainForm')!, searchDataHtml, deleteUserFormCallback).createFragment().addFragment();
            }

            if ((<HTMLInputElement>event.target).id === "deleteUserButton") {
                deleteUser((<HTMLInputElement>document.querySelector('#id'))!.value);
                returnStartForm();
            }

            if ((<HTMLInputElement>event.target).id === "calculateBank") {
                let calculateCurrency = (<HTMLInputElement>document.getElementById('calculateCurrency')!).value;
                toCalculateBankMoney(calculateCurrency, convertMoney);
                clearParents(document.querySelector('#mainForm')!);
                new addHtmlForm(document.querySelector('#mainForm')!, calculateFormData).createFragment().addFragment();
            }
        }
    })

    document.body.addEventListener('focusout', function (event) {
        event.preventDefault();
        if ((<HTMLInputElement>event.target).classList.contains("ownSum") || (<HTMLInputElement>event.target).classList.contains("limit")) {

            if (!/^\d+$/.test((<HTMLInputElement>event.target).value) && !((<HTMLInputElement>event.target).value.length === 0)) {
                alert("Поля 'сумма на счету' и 'кредитный лимит' должны содержать только цифры");
                (<HTMLInputElement>event.target).value = '';
            }
        }

        if (((<HTMLInputElement>event.target).id === 'firstName') || ((<HTMLInputElement>event.target).id === 'lastName')) {

            if (!/^[A-Za-z]+$/.test((<HTMLInputElement>event.target).value) && !((<HTMLInputElement>event.target).value === '')) {
                alert("Поля 'Имя' и 'Фамилия' должны содержать только буквы");
                (<HTMLInputElement>event.target).value = '';
            }
        }
    });
}