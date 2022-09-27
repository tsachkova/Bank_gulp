let calculateBankData: {[key:string]:number} = {};

type Rate = {
    ccy: string,
    base_ccy: string,
    buy: string,
    sale: string
}

type CallbackConvert = (currencyRate: Rate[], requiredCurrency: string, sum: number, currencyAccount: string) => number

function convertMoney(currencyRate: Rate[], requiredCurrency: string, sum: number, currencyAccount: string) {
    if ((requiredCurrency.length !== 3) && (typeof requiredCurrency !== 'string')) {
        throw new Error("invalid currency type format");
    }

    if ((sum >= 0) && (currencyAccount === requiredCurrency)) {
        return sum;
    }

    let rate: Rate;

    function getRate(currency: string) {

        for (let i = 0; i < currencyRate.length; i++) {
            if (currency === currencyRate[i].ccy) {
                rate = currencyRate[i];
            }
        }

        if (currencyRate === undefined) {
            alert("this type of currency is not found");
            document.querySelector('body')!.innerHTML = '';
            returnStartForm();

            throw new Error("this type of currency is not found");
        }
        return rate;
    }

    let requiredCurrencyRate: Rate;

    if (requiredCurrency !== 'UAH') {
        requiredCurrencyRate = getRate(requiredCurrency);
    }

    if ((sum >= 0) && (currencyAccount !== 'UAH')) {
        let accountCurrencyRate = getRate(currencyAccount);

        let accountUah = sum * Number(accountCurrencyRate.sale);

        if (requiredCurrency === 'UAH') {
            return accountUah;
        }

        return accountUah / Number(requiredCurrencyRate!.sale);
    }

    if (sum >= 0) {
        return sum / Number(requiredCurrencyRate!.sale);
    }
}

function calculatSumBank(rate: Rate[], requiredCurrency: string, callback: CallbackConvert) {
    let sumBankUsd = 0;

    let rateCurrencyCallback = callback.bind({}, rate, requiredCurrency)

    for (let i = 0; i < bank.length; i++) {

        let { credit, debet } = bank[i];
        for (let j = 0; j < credit.length; j++) {
            if (credit[j].ownMoney > 0) {
                sumBankUsd += rateCurrencyCallback(credit[j].ownMoney, credit[j].currency);
            }

            sumBankUsd += rateCurrencyCallback(credit[j].creditMoney!, credit[j].currency);
        }

        for (let j = 0; j < bank[i].debet.length; j++) {
            sumBankUsd += rateCurrencyCallback(debet[j].ownMoney, debet[j].currency);
        }
    }

    calculateBankData['allBankSum'] = sumBankUsd;
}

function calculatDebt(rate: Rate[], requiredCurrency: string, convertCallback: CallbackConvert, sumKey: string, countKey?: string, callback?: CallbackIsActive) {
    let debt = 0;
    let countDebt = 0;

    for (let i = 0; i < bank.length; i++) {
        let isCalculetData: boolean | undefined;

        if (callback) {
            isCalculetData = callback(bank[i]);
        } else {
            isCalculetData = true;
        }

        let count = 0;

        if (isCalculetData) {
            for (let j = 0; j < bank[i].credit.length; j++) {

                if (bank[i].credit[j].ownMoney < 0) {
                    debt += convertCallback(rate, requiredCurrency, Math.abs(bank[i].credit[j].ownMoney), bank[i].credit[j].currency);
                    count = count || 1;
                }

            }
            countDebt += count;

        }
    }

    calculateBankData[sumKey] = debt;
    if (countKey) {
        calculateBankData[countKey] = countDebt;
    }
}

type CallbackIsActive = (clientData: Client) => boolean | undefined;

function debtActive(clientData: Client) {
    if (clientData.isActive) {
        return true;
    }
}

function debtNotActive(clientData: Client) {
    if (!clientData.isActive) {
        return true;
    }
}

async function toCalculateBankMoney(requiredCurrency:string, callback:CallbackConvert) {
    let currenRequest = (await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).json();
    currenRequest.then(requestResult => calculatSumBank(requestResult, requiredCurrency, callback))
    currenRequest.then((requestResult) => calculatDebt(requestResult, requiredCurrency, callback, 'sumDebtActive', 'countDebtActiveUser', debtActive))
    currenRequest.then((requestResult) => calculatDebt(requestResult, requiredCurrency, callback, 'sumDebtNotActive', 'countNotActiveDebtor', debtNotActive))
    currenRequest.then((requestResult) => calculatDebt(requestResult, requiredCurrency, callback, 'allDebtSum'))
    currenRequest.then(() => putCalculateData(calculateBankData, requiredCurrency))
}