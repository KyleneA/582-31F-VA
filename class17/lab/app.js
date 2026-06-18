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

    loadTeamsBtn.addEventListener("click", () => {
        statusP.textContent = "Loading...";
        statusP.className = "loading";

        fetchTeams()
            .then((teams) => {
                setTimeout(() => {
                    statusP.textContent = "Success!";
                    statusP.className = "success";
                    clearBtn.disabled = false;
                    
                    renderTeams(teams, teamsContainer);
                }, 1000);
            })
            .catch((error) => {
                setTimeout(() => {
                    statusP.textContent = `Failed to load teams.  (${error})`;
                    statusP.className = "error";
                    clearBtn.disabled = false;
                    
                    renderTeams(teams, teamsContainer);
                }, 500);

            });
    });

    clearBtn.addEventListener("click", () => {
        statusP.textContent = "Ready to load teams";
        statusP.className = "";

        teamsContainer.innerHTML = "";
        spotlightTeam.innerHTML = `<h3>No team selected yet</h3>`;
    });

}

main();