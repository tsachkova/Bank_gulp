type CreatElementCallback = (container: HTMLElement) => void;


let createFormCallback: CreatElementCallback = function (container:HTMLElement) {
    mainForm.innerHTML = '';

    let legendCredit: HTMLLegendElement = document.createElement('legend');
    legendCredit.textContent = 'Кредит';

    let creditContainer: Element = container.querySelector('#credit')!;
    creditContainer.append(legendCredit);

    let legendDebet: HTMLLegendElement = document.createElement('legend');
    legendDebet.textContent = 'Дебит';

    let debitContainer: Element = container.querySelector('#debet')!;
    debitContainer.append(legendDebet);
}

let creditAccountFormCallback: CreatElementCallback = function (container:HTMLElement) {
    container.insertAdjacentHTML('afterbegin', `<p><label for="limit">кредитный лимит</label><input type="text" class="limit" placeholder="0" autocomplete= "off"></p>`);
}

let editFormCallback: CreatElementCallback = function (container:HTMLElement) {
    let legendEdit = document.createElement('legend');
    legendEdit.textContent = "Редактирование данных";
    container.prepend(legendEdit);
    createFormCallback(container);
}

let deleteUserFormCallback: CreatElementCallback = function () {
    let seaerchContainer = document.querySelector("#search") as HTMLInputElement;
    seaerchContainer.value = 'Удалить';
    seaerchContainer.id = 'deleteUserButton';
}