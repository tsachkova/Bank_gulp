class addHtmlForm {
    dataHtml: dataHtml[];
    parent: HTMLElement;
    callback?: CreatElementCallback;

    constructor(parent: HTMLElement, dataHtml: dataHtml[], callback?: CreatElementCallback) {
        this.dataHtml = dataHtml;
        this.parent = parent;
        this.callback = callback;
    }

    container = document.createElement('fieldset');

    createNewElement(elementData: dataHtml, elementParent: HTMLElement) {

        function createElementForTeg<K extends keyof HTMLElementTagNameMap>(tag: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K] {
            let element = document.createElement(tag)

            if (options) {
                Object.assign(element, options);
            }

            return element
        }

        let element = createElementForTeg(elementData.element);


        if (typeof elementData.element === 'string') {
            element = document.createElement(elementData.element);

            if (elementData.name) {
                element.setAttribute('name', `${elementData.name}`)
            }

            if (elementData.id) {
                element.id = elementData.id;
            }

            if (elementData.className) {
                element.setAttribute('class', `${elementData.className}`);
            }

            if (elementData.type) {
                element.setAttribute('type', `${elementData.type}`);
            }

            if (elementData.value) {
                element.setAttribute('value', `${elementData.value}`);
            }

            if (elementData.for) {
                element.setAttribute('for', `${elementData.for}`);
            }

            if (elementData.size) {
                element.setAttribute('size', `${elementData.size}`);
            }

            if (elementData.textContent) {
                element.textContent = `${elementData.textContent}`;
            }

            if (elementData.placeholder) {
                element.setAttribute('placeholder', `${elementData.placeholder}`);
            }
        }

        elementParent.append(element);
        return this;
    }

    createFragment() {
        for (let i = 0; i < this.dataHtml.length; i++) {
            let elementData: dataHtml
            let elementParent: HTMLElement;
            elementData = this.dataHtml[i];

            if (elementData.p) {
                elementParent = document.createElement('p');
                this.createNewElement(elementData, elementParent);

                if (elementData.nextElement) {
                    elementData = elementData.nextElement;
                    this.createNewElement(elementData, elementParent);
                }

                this.container.append(elementParent);

            } else {
                elementParent = this.container;
                this.createNewElement(elementData, elementParent);

                if (elementData.nextElement) {
                    elementData = elementData.nextElement;
                    this.createNewElement(elementData, elementParent);
                };
            }
        }

        return this;
    }

    addFragment() {

        if (this.callback) {
            this.callback(this.container);
        }

        this.parent.append(this.container);
    }

    addSelectOption() {
        let optionParent = this.container.querySelector('select') as HTMLElement;

        let optionValues = ["UAH", "EUR", "USD"];

        for (let i = 0; i < optionValues.length; i++) {
            let options = document.createElement('option');
            options.value = optionValues[i];
            options.innerHTML = optionValues[i];;
            optionParent.append(options);
        }

        return this;
    }
}

function clearParents(parents: HTMLElement) {
    parents.innerHTML = '';
}

function returnStartForm() {

    if (editedClientGetPut) {
        editedClientGetPut = null;
    }

    clearParents(document.querySelector('#mainForm')!);
    new addHtmlForm(startParents, startHtmlData).createFragment().addSelectOption().addFragment();
}