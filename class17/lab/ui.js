export function renderTeams(teams, container) {
    container.innerHTML = "";

    console.log(typeof teams);
    for (const team of teams) {

        const teamCard = document.createElement("team-card");

        const keys = Object.keys(team);

        for (const keyName of keys) {
            teamCard.setAttribute(keyName.startsWith("__") ? keyName.substring(2) : keyName, team[keyName]);
        }

        container.appendChild(teamCard);
    }
}