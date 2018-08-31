class UserInfo extends HTMLElement {

    static get observedAttributes() { return ['name', 'age']; }

    attributeChangedCallback(attr, old, value) {
        switch (attr) {
            case 'name':
                if (!this.nameValue) {
                    this.nameValue = document.createElement('div');
                    this.appendChild(this.nameValue);
                }
                this.nameValue.innerHTML = "User name is " + value;

                break;
            case 'age':
                if (!this.ageValue) {
                    this.ageValue = document.createElement('div');
                    this.appendChild(this.ageValue);
                }
                this.ageValue.innerHTML = "User age is " + value;

                break;
        }
    }
}

customElements.define('my-element', UserInfo);


