const template = document.getElementById("message-template");
const output = document.getElementById("output");

const clone = template.content.cloneNode(true);
output.appendChild(clone);

for (let i = 0; i < 2; i++) {
    const clone = template.content.cloneNode(true);
    output.appendChild(clone);
}

// Data
const teams = [
    { name: "Argentina", group: "A", points: 5 },
    { name: "Canada", group: "B", points: 5 },
    { name: "Spain", group: "C", points: 5 },
    { name: "Japan", group: "D", points: 5 },
];

// DOM
const teamsContainer = document.getElementById("teams-container");

// creating a helper function to modify clone data
function createTeamCard(team) {
    const teamTemplate = document.getElementById("team-template");

    const clone = teamTemplate.content.cloneNode(true);
    
    const teamName = clone.querySelector(".team-name");
    teamName.textContent = team.name;
    const teamGroup = clone.querySelector(".team-group");
    teamGroup.textContent = "Group: " + team.group;
    const teamPoints = clone.querySelector(".team-points");
    teamPoints.textContent = "Points: " + team.points;

    return clone;
}

// rendering to html
teams.forEach((team) => {
    const newTeamCard = createTeamCard(team)

    teamsContainer.appendChild(newTeamCard);
});