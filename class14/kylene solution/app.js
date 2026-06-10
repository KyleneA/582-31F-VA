import { fetchTournaments } from "./api.js"

const loadTournamentsBtn = document.getElementById("load-tournaments");
const tournamentsGrid = document.querySelector(".tournaments-grid");
const statusP = document.getElementById("status");

loadTournamentsBtn.addEventListener("click", () => {
    statusP.textContent = "Loading...";
    statusP.className = "fw-medium text-black";

    fetchTournaments()
        .then((tournaments) => {
            for (const tournament of tournaments) {
                const TournamentCard = renderTournamentCard(tournament);
                
                tournamentsGrid.appendChild(TournamentCard);
            }
        })
    
    statusP.textContent = "Tournaments loaded successfully";
    statusP.className = "fw-medium text-capitalize text-primary";
})

function renderTournamentCard(tournament){
    const colDiv = document.createElement("div");
    colDiv.className = "col-4 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card p-2";

    colDiv.appendChild(cardDiv);

    const cardHeaderDiv = document.createElement("div");
    const cardHeaderH3 = document.createElement("h3");
    cardHeaderH3.textContent = tournament.name;
    cardHeaderDiv.appendChild(cardHeaderH3);

    const cardBodyDiv = document.createElement("div");
    const gameTitle = document.createElement("h4");
    gameTitle.textContent = tournament.game;
    const entryFee = document.createElement("p");
    entryFee.textContent = `Entry Fee: ${tournament.entryFee}`;
    const maxPlayers = document.createElement("p");
    maxPlayers.textContent = `Max players: ${tournament.maxPlayers}`;
    const registeredPlayers = document.createElement("p");
    registeredPlayers.textContent = `Registered players: ${tournament.registeredPlayers}`;
    const tournamentStatus = document.createElement("p");
    tournamentStatus.textContent = `Status: ${tournament.status}`;
    cardBodyDiv.append(gameTitle, entryFee, maxPlayers, registeredPlayers, tournamentStatus);

    const cardFooterDiv = document.createElement("div");
    const registrationsBtn = document.createElement("button");
    registrationsBtn.textContent = "View Registrations";
    registrationsBtn.className = "btn btn-info w-100";
    cardFooterDiv.appendChild(registrationsBtn);

    cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv);
    return colDiv;
}