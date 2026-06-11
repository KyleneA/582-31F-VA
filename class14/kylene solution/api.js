export function fetchTournaments(){
    return fetch("./tournaments.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status}`);
            }
            return response.json();
    })
}

export function fetchRegistration(){
    return fetch("./registrations.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status}`);
            }
            return response.json();
        })
}