import Team from "./team.js"
import { fetchTeams } from "./api.js";
import { renderTeams } from "./ui.js";

function main(){
    // Loader container
    const statusP = document.getElementById("status");
    const loadTeamsBtn = document.getElementById("load-btn");
    const clearBtn = document.getElementById("clear-btn");

    // Teams container
    const teamsContainer = document.getElementById("teams-container");

    // Selected display
    const spotlightTeam = document.getElementById("team-details-container");

    // Event Listeners
    loadTeamsBtn.addEventListener("click", () => {
        statusP.textContent = "Loading...";
        statusP.className = "loading";

        fetchTeams()
            .then((teams) => {
                const teamObjs = [];

                for (const team of teams) {
                    teamObjs.push(Team.fromObject(team));
                }

                return teamObjs;
            })
            .then((teamObjs) => {
                setTimeout(() => {
                    statusP.textContent = "Teams loaded successfully!";
                    statusP.className = "success";
                    clearBtn.disabled = false;
                    loadTeamsBtn.disabled = true;
                    
                    renderTeams(teamObjs, teamsContainer);
                }, 1000);
            })
            .catch((error) => {
                setTimeout(() => {
                    statusP.textContent = `Failed to load teams.  (${error})`;
                    statusP.className = "error";
                    clearBtn.disabled = false;                    
                }, 500);
                
            });
    });
        
    clearBtn.addEventListener("click", () => {
        statusP.textContent = "Dashboard cleared";
        statusP.className = "";
        loadTeamsBtn.disabled = false;
        
        teamsContainer.innerHTML = "";
        spotlightTeam.innerHTML = "";
        const spotlightTeamH3 = document.createElement("h3");
        spotlightTeamH3.textContent ="No team selected yet";
        spotlightTeam.append(spotlightTeamH3);

        setTimeout(() => {
            statusP.textContent = "Ready to load teams";
        }, 1000);
    });

    document.addEventListener("addTeamDetails", (e) => {
        console.log("dispatched", e);
        spotlightTeam.innerHTML = ""

        const spotlightTeamCard = document.createElement("team-card"); 
        spotlightTeamCard.setAttribute("name", e.detail.name);
        spotlightTeamCard.setAttribute("group", e.detail.group);
        spotlightTeamCard.setAttribute("points", e.detail.points);
        spotlightTeamCard.setAttribute("played", e.detail.gamesPlayed);
        spotlightTeamCard.setAttribute("goalDifference", e.detail.goalDifference);
        spotlightTeamCard.setAttribute("isSelectedDisplay", true);

        const spotlightTeamH3 = document.createElement("h3");
        spotlightTeamH3.textContent = `Team ${e.detail.name}`

        spotlightTeam.append(spotlightTeamH3, spotlightTeamCard);
    });
}

main();