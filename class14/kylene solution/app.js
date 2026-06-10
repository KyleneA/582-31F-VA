import { fetchTournaments } from "./api.js"
import { renderTournamentCard, tournamentStatusUi } from "./ui.js";

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
        }).catch((error) => {
            console.log(error);
            tournamentStatusUi("error", statusP);
        });
})