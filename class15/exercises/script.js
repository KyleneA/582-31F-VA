// 1. create a custom element called:
//              <movie-card></movie-card>

// this element should accept these attributes:

//   1. title 2. year 3. rating

class MovieCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("title");
        const year = this.getAttribute("year");
        const rating = this.getAttribute("rating");

        this.innerHTML = `
            <div>
                <h2> ${title} (${year}) </h2>
                <p> <strong> Rating: </strong> ${rating} </p>
            </div>
        `;
    }
}
customElements.define("movie-card", MovieCard);
// render it on your html file.

// 2. refactor a basic custom element

class HelloBox extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div>
            <h2>Hello!</h2>
            <p>Welcome to custom elements.</p>
        </div>
        `;
    }
}

customElements.define("hello-box", HelloBox);

// refactor it so that connectedCallback only calls render()
// All HTML generation happens inside render()

// 3. create another GameCard custom element with the following:

//      1. connectedCallback()
//      2. getTitle()
//      3. getYear()
//      4. getRating()
//      4.b formats Rating  -- ratingFormatter() X/5
//      5. renderHeading()
//      6. renderBody()
//      7. render()

class GameCard extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    getTitle() {
        const title = this.getAttribute("title");

        return title;
    }

    getYear() {
        const year = this.getAttribute("year");

        return year;
    }

    getRating() {
        const rating = this.getAttribute("rating");

        return rating;
    }

    ratingFormatter(rating){
        return `${rating}/10`;
    }

    renderHeading(title, year) {
        const heading = document.createElement("div");

        heading.innerHTML = `
            <h2> ${title} (${year}) </h2>
        `;

        return heading;
    }

    renderBody(rating) {
        const body = document.createElement("div");

        body.innerHTML = `
            <p> <strong> Rating: </strong> ${rating} </p>
        `;

        return body;
    }

    render() {
        const title = this.getTitle();
        const year = this.getYear();
        const rating = this.ratingFormatter(this.getRating());
        const card = document.createElement("article")
        card.append(this.renderHeading(title,year), this.renderBody(rating));
        
        this.append(card);
    }
}

customElements.define("game-card", GameCard);