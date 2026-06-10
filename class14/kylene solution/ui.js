import { fetchRegistration } from "./api.js";
import { Tournament } from "./tournament.js";

export function tournamentStatusUi(type, statusP){
    if (type === "loading") {
        statusP.textContent = "Loading...";
        statusP.className = "fw-medium text-black";
    } else if (type === "success") {
        statusP.textContent = "Tournaments loaded successfully";
        statusP.className = "fw-medium text-capitalize text-primary";
    } else if (type === "error") {
        statusP.textContent = "Tournaments failed to load.";
        statusP.className = "list-group-item fw-medium text-uppercase text-danger";
    } else {
        statusP.textContent = "ready to load";
        statusP.className = "list-group-item fw-medium text-uppercase text-success";
    }
}

export function registrationStatusUi(type, statusLi){
    if (type === "loading") {
        statusLi.textContent = "Loading...";
        statusLi.className = "list-group-item fw-medium text-black text-center";
    } else if (type === "success") {
        statusLi.textContent = "Registrations loaded successfully";
        statusLi.className = "list-group-item fw-medium text-capitalize text-primary text-center";
    } else if (type === "error") {
        statusLi.textContent = "Registrations failed to load.";
        statusLi.className = "list-group-item fw-medium text-uppercase text-danger text-center";
    }
}

export function renderTournamentCard(tournament){
    const colDiv = document.createElement("div");
    colDiv.className = "col-4 mb-4";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card p-2";

    colDiv.appendChild(cardDiv);

    const cardHeaderDiv = createCardHeader(tournament);
    const cardBodyDiv = createCardBody(tournament);
    const cardFooterDiv = createCardFooter(tournament);
    
    cardDiv.append(cardHeaderDiv, cardBodyDiv, cardFooterDiv);
    
    return colDiv;
}

function createCardHeader(tournament){
    const cardHeaderDiv = document.createElement("div");
    const cardHeaderH3 = document.createElement("h3");
    cardHeaderH3.textContent = tournament.name;
    cardHeaderDiv.appendChild(cardHeaderH3);

    return cardHeaderDiv;
}

function createCardBody(tournament){
    const cardBodyDiv = document.createElement("div");

    const gameTitle = document.createElement("h4");
    gameTitle.textContent = tournament.game;

    const entryFee = document.createElement("p");
    entryFee.textContent = `Entry Fee: $${tournament.entryFee}`;

    const maxPlayers = document.createElement("p");
    maxPlayers.textContent = `Max players: ${tournament.maxPlayers}`;

    const registeredPlayers = document.createElement("p");
    registeredPlayers.textContent = `Registered players: ${tournament.registeredPlayers}`;

    const tournamentStatus = document.createElement("p");
    tournamentStatus.textContent = `Status: ${tournament.status}`;

    cardBodyDiv.append(gameTitle, entryFee, maxPlayers, registeredPlayers, tournamentStatus);

    return cardBodyDiv;
}

function createCardFooter(tournament){
    const cardFooterDiv = document.createElement("div");

    const registrationsBtn = document.createElement("button");
    registrationsBtn.textContent = "View Registrations";
    registrationsBtn.className = "btn btn-info w-100";

    const registrationUl = document.createElement("ul");
    registrationUl.className = "list-group list-group-flush";

    const registrationBtnStatus = document.createElement("li");
    registrationBtnStatus.textContent = "READY TO LOAD REGISTRATIONS";
    registrationBtnStatus.className = "list-group-item fw-medium text-success text-center";
    registrationUl.appendChild(registrationBtnStatus);
    cardFooterDiv.append(registrationsBtn, registrationUl);

    registrationsBtn.addEventListener("click",() => {
        const tournamentID = tournament.id;

        registrationStatusUi("loading", registrationBtnStatus);
        
        fetchRegistration()
            .then((registrations) => {
                const relatedRegistrations = registrations.filter(related => related.tournamentId === tournamentID);
                
                registrationUl.appendChild(renderSummary(relatedRegistrations, tournament));

                for (const related of relatedRegistrations) {
                    const info = renderRegistration(related);
                    registrationUl.appendChild(info);
                }

                registrationStatusUi("success", registrationBtnStatus);
            })
            .catch((error) => {
                setTimeout(() => {
                    console.log(error);
                    registrationStatusUi("error", registrationBtnStatus);
                })
            });
    });
    
    return cardFooterDiv;
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

function renderSummary(relatedRegistrations, tournament){
    const summaryLi = document.createElement("li");
    summaryLi.className = "list-group-item bg-info-subtle";
    summaryLi.innerHTML = "<p class='fw-medium'> Tournament Summary </p>";

    const totalRegistrations = document.createElement("p");
    totalRegistrations.textContent = "Total registrations: " + relatedRegistrations.length;
    
    const totalConfirmed = document.createElement("p");
    const confirmed = relatedRegistrations.filter(related => related.status === "confirmed").length;
    totalConfirmed.textContent = "Total confirmed: " + confirmed;
    
    const expectedRevenue = document.createElement("p");
    const revenue = Number(tournament.entryFee) * confirmed;
    expectedRevenue.textContent = "Expected revenue: $" + revenue;
    
    const spotsLeft = document.createElement("p");
    const tournamentClass = Tournament.fromObject(tournament);
    const spots = tournamentClass.spotsLeft;
    spotsLeft.textContent = "Spots left: " + spots;
    
    summaryLi.append(totalRegistrations, totalConfirmed, expectedRevenue, spotsLeft);

    return summaryLi;
}