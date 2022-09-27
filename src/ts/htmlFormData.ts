type Tag = 'input' | 'label' | 'fieldset' | 'input' | 'legend' | 'p' | 'select';

type dataHtml = {
    element: Tag,
    type?: string,
    value?: string,
    id?: string,
    p?: boolean,
    for?: string,
    textContent?: string,
    className?: string,
    size?: string,
    name?: string,
    placeholder?: string,
    nextElement?: dataHtml
}

let startHtmlData: dataHtml[] = [

    {
        element: 'input',
        type: 'button',
        value: 'создать нового пользователя',
        id: "createUser",
        p: true
    },

    {
        element: 'input',
        type: 'button',
        value: 'изменить данные пользователя',
        id: "editUser",
        p: true
    },

    {
        element: 'input',
        type: 'button',
        value: 'удалить пользователя',
        id: "deleteUser",
        p: true
    },

    {
        element: 'input',
        type: 'button',
        value: 'Рассчитать суммарные показатели по банку',
        id: "calculateBank",
        p: true
    },

    {
        element: 'label',
        for: "calculateCurrency",
        textContent: 'рассчетная валюта  ',
        nextElement: {
            element: 'select',
            id: "calculateCurrency",
            size: '1'
        },
    }
];

let createUserData: dataHtml[] = [
    {
        p: true,
        element: 'label',
        for: "firstName",
        textContent: 'Имя ',
        nextElement: {
            element: 'input',
            type: 'text',
            id: "firstName",
            name: "firstName"
        }
    },

    {
        p: true,
        element: 'label',
        for: "lastName",
        textContent: 'Фамилия ',
        nextElement: {
            element: 'input',
            type: 'text',
            id: "lastName",
            name: "lastName"
        }
    },

    {
        p: true,
        element: 'label',
        for: "isActive",
        textContent: 'Активность аккаунта',
        nextElement: {
            element: 'input',
            type: 'checkbox',
            id: "isActive",
        }
    },

    {
        element: 'fieldset',
        id: 'debet',
    },

    {
        element: 'fieldset',
        id: 'credit',
    },

    {
        element: 'input',
        type: 'button',
        value: "добавить дебитовый счет",
        id: "debitAccount",
    },

    {
        element: 'input',
        type: 'button',
        value: "добавить кредитовый счет",
        id: "creditAccount",
    },

    {
        p: true,
        element: 'input',
        type: "button",
        id: 'submit',
        value: "Применить"
    },

    {
        p: true,
        element: 'input',
        type: "button",
        id: 'back',
        value: "  Отмена  "
    },
];

let debitDataHtml: dataHtml[] = [
    {
        p: true,
        element: 'label',
        for: "ownSum",
        textContent: 'сумма на счету',
        nextElement: {
            element: 'input',
            type: 'text',
            className: "ownSum",
            placeholder: "0"
        }
    },

    {
        p: true,
        element: 'label',
        for: "isActive",
        textContent: 'счет активен',
        nextElement: {
            element: 'input',
            type: "checkbox",
            className: "isActive",
        }
    },

    {
        p: true,
        element: 'label',
        for: "currency",
        textContent: 'валюта счета',
        nextElement: {
            element: 'select',
            className: "currency",
            size: '1'
        }
    },

    {
        p: true,
        element: 'input',
        type: "button",
        className: "deleteAccount",
        value: "удалить"
    },
];



let searchDataHtml: dataHtml[] = [
    {
        element: 'legend',
        textContent: 'Изменение данных'
    },

    {
        p: true,
        element: 'label',
        for: "id",
        textContent: 'id',
        nextElement: {
            element: 'input',
            type: 'text',
            id: "id",
        }
    },

    {
        p: true,
        element: 'input',
        type: "button",
        id: 'search',
        value: "Искать"
    },

    {
        p: true,
        element: 'input',
        type: "button",
        id: 'back',
        value: "Назад"
    },
];

let editUserData: dataHtml[] = [
    {
        element: 'p',
        textContent: 'ID клиента - ',
        id: "idEditClient"
    },

    {
        element: 'p',
        textContent: 'Дата регистрации - ',
        id: "dateEditClient"
    },
];

let editUserDataHtml = editUserData.concat(createUserData);

let calculateFormData: dataHtml[] = [
    {
        p: true,
        element: 'label',
        for: "allBankSum",
        textContent: `сумма средств по банку в `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "allBankSum",
            name: "allBankSum"
        }
    },

    {
        p: true,
        element: 'label',
        for: "sumDebtActive",
        textContent: `сумма задолженности активных клиентов по банку в `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "sumDebtActive",
            name: "sumDebtActive"
        }
    },

    {
        p: true,
        element: 'label',
        for: "countDebtActiveUser",
        textContent: `количество активных клиентов - должников `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "countDebtActiveUser",
            name: "countDebtActiveUser"
        }
    },

    {
        p: true,
        element: 'label',
        for: "sumDebtNotActive",
        textContent: `сумма задолженности неактивных клиентов по банку в  `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "sumDebtNotActive",
            name: "sumDebtNotActive"
        }
    },

    {
        p: true,
        element: 'label',
        for: "countNotActiveDebtor",
        textContent: `количество неактивных клиентов - должников `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "countNotActiveDebtor",
            name: "countNotActiveDebtor"
        }
    },

    {
        p: true,
        element: 'label',
        for: "allDebtSum",
        textContent: `сумма общей задолженности по банку в `,
        nextElement: {
            element: 'input',
            type: 'text',
            id: "allDebtSum",
            name: "allDebtSum"
        }
    },

    {
        p: true,
        element: 'input',
        type: "button",
        id: 'back',
        value: "Назад"
    }
];