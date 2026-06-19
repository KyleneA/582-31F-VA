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
                    statusP.textContent = "Success!";
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
                    
                    renderTeams(teams, teamsContainer);
                }, 500);
                
            });
        });
        
        clearBtn.addEventListener("click", () => {
            statusP.textContent = "Ready to load teams";
            statusP.className = "";
            loadTeamsBtn.disabled = false;

            teamsContainer.innerHTML = "";
            spotlightTeam.innerHTML = `<h3>No team selected yet</h3>`;
    });

}

main();