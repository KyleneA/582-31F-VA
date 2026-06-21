class TeamCard extends HTMLElement {
    connectedCallback() {
        const name = this.getName();
        const group = this.getGroup();
        const points = this.getPoints();
        const gamesPlayed = this.getGamesPlayed();
        const goalDifference = this.getGoalDifference();
        const isSelectedDisplay = this.getIsSelectedDisplay();

        if (name === "Undefined" && group === "Undefined" && points === "N/A" && gamesPlayed === "N/A" && goalDifference === "N/A") return;
        else this.render(name, group, points, gamesPlayed, goalDifference, isSelectedDisplay);
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
        return this.getAttribute("goalDifference") || "N/A";
    }

    getIsSelectedDisplay() {
        return this.getAttribute("isSelectedDisplay") || false;
    }

    renderStyle() {
        return `
            <style>
                .card {
                    padding: 10px 20px;
                    border: 1px solid black;
                    border-radius: 4px;

                    p {
                        margin: 0;
                    }

                    .card-header {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 5px;

                        h3 {
                            margin: 0;
                        }
                    }

                    .card-body {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        column-gap: 25px;
                        margin-top: 5%;
                    }

                    .card-footer {
                        margin-top: 5%;

                        button {
                            width: 100%;
                            text-transform: capitalize;
                            background-color: forestgreen;
                            border-radius: 20px;
                            
                            a {
                                display: inline-block;
                                width: 100%;
                                text-decoration: none;
                                color: aliceblue;
                            }
                            
                            a:hover {
                                color: black;
                            }
                        }

                        button:hover {
                            background-color: honeydew;
                        }
                    }
                }
            </style>
        `;
    }

    createCardHeader(name, group) {
        const cardHeader = document.createElement("div");
        cardHeader.className = "card-header";
        const headerH3 = document.createElement("h3");
        headerH3.textContent = name.toUpperCase();
        const headerP = document.createElement("p");
        headerP.textContent = `(Group ${group.toUpperCase()})`;
        cardHeader.append(headerH3, headerP);

        return cardHeader;
    }

    createCardBody(points, gamesPlayed, goalDifference) {
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        const pointsP = document.createElement("p");
        pointsP.textContent = `${points} Points`;
        const gamesP = document.createElement("p");
        gamesP.textContent = `Games played: ${gamesPlayed}`;
        const goalsP = document.createElement("p");
        goalsP.textContent = `Goal difference: ${goalDifference}`;
        cardBody.append(gamesP, goalsP, pointsP);

        return cardBody;
    }

    createCardFooter(name, group, points, gamesPlayed, goalDifference) {
        const cardFooter = document.createElement("div");
        cardFooter.className = "card-footer";
        const detailsBtn = document.createElement("button");
        const detailsLink = document.createElement("a");
        detailsLink.textContent = "View Details";
        detailsLink.href = "#selected-display";
        detailsBtn.appendChild(detailsLink);
        cardFooter.appendChild(detailsBtn);

        detailsBtn.addEventListener("click", () => {
            console.log("clicked")
            const event = new CustomEvent("addTeamDetails", {
                composed: true,
                detail: {
                    name: name,
                    group: group,
                    points: points,
                    gamesPlayed: gamesPlayed,
                    goalDifference: goalDifference,
                }
            });
            document.dispatchEvent(event);
        });

        return cardFooter;
    }
    
    
    render(name, group, points, gamesPlayed, goalDifference, isSelectedDisplay) {
        const teamCard = this.attachShadow({mode: "open"});
        
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        
        const cardHeader = this.createCardHeader(name, group);
        
        const cardBody = this.createCardBody(points, gamesPlayed, goalDifference);
        
        if (!isSelectedDisplay) {
            const cardFooter = this.createCardFooter(name, group, points, gamesPlayed, goalDifference);
            cardDiv.append(cardHeader, cardBody, cardFooter);
            
            teamCard.innerHTML = this.renderStyle();
            teamCard.append(cardDiv);
        } else {
            cardDiv.append(cardHeader, cardBody);
            
            teamCard.innerHTML = this.renderStyle();
            teamCard.append(cardDiv);
        }
    }
}

customElements.define("team-card", TeamCard);