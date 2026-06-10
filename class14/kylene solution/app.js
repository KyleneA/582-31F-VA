import { fetchTournaments, fetchRegistration } from "./api.js"
import { tournamentStatusUi } from "./ui.js";

const loadTournamentsBtn = document.getElementById("load-tournaments");
const tournamentsGrid = document.querySelector(".tournaments-grid");
const statusP = document.getElementById("status");
const tournamentsH2 = document.querySelector(".tournaments-h2");

loadTournamentsBtn.addEventListener("click", () => {
    tournamentsH2.style = "display: block;";
    tournamentStatusUi("loading", statusP);

    fetchTournaments()
        .then((tournaments) => {
            tournamentsGrid.style = "display: none;";
            for (const tournament of tournaments) {
                const TournamentCard = renderTournamentCard(tournament);
                
                tournamentsGrid.appendChild(TournamentCard);
            }
            
            setTimeout(() => {
                tournamentStatusUi("success", statusP);
                tournamentsGrid.style = "display: flex;";
            }, 1000)
        })
    
    
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
    registrationsBtn.id = `registration-${tournament.id}`;
    const registrationUl = document.createElement("ul");
    registrationUl.className = "list-group list-group-flush";
    const registrationBtnStatus = document.createElement("li");
    registrationBtnStatus.textContent = "READY TO LOAD REGISTRATIONS";
    registrationBtnStatus.className = "list-group-item fw-medium text-success";
    registrationUl.appendChild(registrationBtnStatus);
    cardFooterDiv.append(registrationsBtn, registrationUl);
    
    cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv);
    
    registrationsBtn.addEventListener("click",() => {
        const tournamentID = tournament.id;
        registrationBtnStatus.textContent = "Loading registrations...";
        registrationBtnStatus.className = "list-group-item fw-medium text-black";
        
        fetchRegistration()
        .then((registrations) => {
            const relatedRegistrations = registrations.filter(related => related.tournamentId === tournamentID);
            
            for (const related of relatedRegistrations) {
                registrationUl.appendChild(renderRegistration(related));
            }
        })
        
        registrationBtnStatus.textContent = "Registrations loaded successfully";
        registrationBtnStatus.className = "list-group-item fw-medium text-primary";
    });


    return colDiv;
}

function renderRegistration(related){
    const registrationInfo = document.createElement("li");
    registrationInfo.className = "list-group-item";

    const playerName = document.createElement("p");
    playerName.textContent = "Player: " + related.playerName;
    const gamerTag = document.createElement("p");
    gamerTag.textContent = "Tag: " + related.gamerTag;
    const ticketType = document.createElement("p");
    ticketType.textContent = "Ticket: " + related.ticketType;
    const registrationStatus = document.createElement("p");
    registrationStatus.textContent = "Status: " + related.status;

    registrationInfo.append(playerName, gamerTag, ticketType, registrationStatus);

    return registrationInfo;
}