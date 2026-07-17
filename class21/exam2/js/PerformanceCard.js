export class PerformanceCard extends HTMLElement{
    constructor(){
        super();

        this._performance = null;

        const shadow = this.attachShadow({
            mode: "open"
        });
        
        const template = document.getElementById(
            "performance-card-template"
        );
        const clone = template.content.cloneNode(true);
        
        shadow.appendChild(clone);
    }
    
    set performance(value) {
        this._performance = value;
    }
    
    get performance() {
        return this._performance;
    }
    
    connectedCallback() {
        this.render();
    }

    render() {
        const article = this.shadowRoot.querySelector(
            ".performance-card"
        );

        article.className = "performance-card";

        if (!this.performance.hasTickets) {
            article.classList.add(
                "sold-out"
            );
        }

        if (!this.performance.featured) {
            article.classList.add(
                "featured"
            );
        }

        this.shadowRoot
            .querySelector(".title")
            .textContent =
                this.performance.title;

        this.shadowRoot
            .querySelector(".artist")
            .textContent =
                this.performance
                    .artist.artistName;

        this.shadowRoot
            .querySelector(".country")
            .textContent =
                this.performance.artist.country;

        this.shadowRoot
            .querySelector(".genre")
            .textContent =
                this.performance.artist.genre;

        this.shadowRoot
            .querySelector(".stage")
            .textContent =
                `Stage: ${
                    this.performance.stage
                }`;

        this.shadowRoot
            .querySelector(".time")
            .textContent =
                `Time: ${
                    this.performance.time
                }`;

        this.shadowRoot
            .querySelector(".price")
            .textContent =
                this.performance
                    .formattedPrice;

        this.shadowRoot
            .querySelector(".tickets")
            .textContent =
                this.performance
                    .ticketLabel;

        this.shadowRoot
            .querySelector(
                ".lineup-label"
            )
            .textContent =
                this.performance.lineupLabel;
    }
}

customElements.define(
    "performance-card",
    PerformanceCard
);
