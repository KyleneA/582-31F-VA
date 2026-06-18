class TeamCard extends HTMLElement {
    connectedCallback() {
        const name = this.getName();
        const group = this.getGroup();
        const points = this.getPoints();
        const gamesPlayed = this.getGamesPlayed();
        const goalDifference = this.getGoalDifference();
        
        this.render(name, group, points, gamesPlayed, goalDifference);
    }

    getName() {
        return this.getAttribute("name") || "Undefined";
    }

    getGroup() {
        return this.getAttribute("group") || "Undefined";
    }

    getPoints() {
        return this.getAttribute("points") || "N/A";
    }

    getGamesPlayed() {
        return this.getAttribute("played") || "N/A";
    }

    getGoalDifference() {
        return this.getAttribute("goal-difference") || "N/A";
    }

    renderStyle() {
        return `
            <style>
                .card {
                    padding: 10px 20px;
                    border: 1px solid black;
                    border-radius: 4px;

                    .card-header {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 5px;

                        h3 {
                            margin: 0;
                        }

                        p {
                            margin: 0;
                        }
                    }

                    .card-body {
                        display: flex;
                        justify-content: space-between;
                    }

                    .card-footer {

                        button {
                            width: 100%;
                            text-transform: capitalize;
                            background-color: forestgreen;
                            border-radius: 20px;
                            color: aliceblue;
                        }
                    }
                }
            </style>
        `;
    }

    render(name, group, points, gamesPlayed, goalDifference) {
        const teamCard = this.attachShadow({mode: "open"});

        teamCard.innerHTML = `
            ${this.renderStyle()}

            <div class="card">
                <div class="card-header">
                    <h3> ${name.toUpperCase()} </h3>
                    <p> (Group ${group.toUpperCase()}) </p>
                </div>

                <div class="card-body">
                    <p> ${points} Points </p>
                    <p> Games played: ${gamesPlayed} </p>
                    <p> Goal difference: ${goalDifference} </p>
                </div>

                <div class="card-footer">
                    <button id="team-${name.toLowerCase()}"> View Details </button>
            </div>
        `;

    }
}

customElements.define("team-card", TeamCard);