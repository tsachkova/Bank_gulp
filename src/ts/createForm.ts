type CreatElementCallback = (container: HTMLElement) => void;


let createFormCallback: CreatElementCallback = function (container) {
    mainForm.innerHTML = '';

    let legendCredit = document.createElement('legend');
    legendCredit.textContent = 'Кредит';

    let creditContainer = container.querySelector('#credit')!;
    creditContainer.append(legendCredit);

    let legendDebet = document.createElement('legend');
    legendDebet.textContent = 'Дебит';

    let debitContainer = container.querySelector('#debet')!;
    debitContainer.append(legendDebet);
}

let creditAccountFormCallback: CreatElementCallback = function (container) {
    container.insertAdjacentHTML('afterbegin', `<p><label for="limit">кредитный лимит</label><input type="text" class="limit" placeholder="0" autocomplete= "off"></p>`);
}

let editFormCallback: CreatElementCallback = function (container) {
    let legendEdit = document.createElement('legend');
    legendEdit.textContent = "Редактирование данных";
    container.prepend(legendEdit);
    createFormCallback(container);
}

let deleteUserFormCallback: CreatElementCallback = function (container) {
    let seaerchContainer = document.querySelector("#search") as HTMLInputElement;
    seaerchContainer.value = 'Удалить';
    seaerchContainer.id = 'deleteUserButton';
}