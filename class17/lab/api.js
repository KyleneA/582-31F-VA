export function fetchTeams() {
    return fetch('./teams.json')
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP ERROR ${response.status}`);

            return response.json();
        })
}