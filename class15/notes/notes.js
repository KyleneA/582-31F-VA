class HelloBox extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div>
            <h2>Hello</h2>
            <p> This is created by browser using class</p>
        </div>
        `;
    }
}

customElements.define("hello-box", HelloBox);

class UserCard extends HTMLElement {
    connectedCallback() {
        const name = this.getAttribute("name");
        const role = this.getAttribute("role");

        this.innerHTML = `
        <div>
        <h2> Name: ${name}</h2>
        <p> Role: ${role}</p>
        </div>
        `;
    }
}

customElements.define("user-card", UserCard);


class CourseInfo extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute("title");
        const credits = this.getAttribute("credits");
        const instructor = this.getAttribute("instructor");

        this.innerHTML = `
            <article>
                <h2>${title}</h2>
                <p><strong>${credits}</strong></p>
                <p><strong>${instructor}</strong></p>
                
            </article>
        `;
    }
}

customElements.define("course-info", CourseInfo)