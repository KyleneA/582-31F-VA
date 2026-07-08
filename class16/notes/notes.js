class UserCard extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div>
                <h1> User Card </h1>
                <h2> H2 Element </h2>
            </div>
        `
    }
}

customElements.define("user-card", UserCard);

class HelloShadow extends HTMLElement {
    connectedCallback(){
        const shadow = this.attachShadow({mode: "open"})
        
        shadow.innerHTML = `
            <style>
                div {
                    padding: 20px;
                    border: 1px dashed blue;
                }
            </style>

            <div>
            <h2> Hello from shadow </h2>
            </div>
        `
    }
}

customElements.define("hello-shadow", HelloShadow);