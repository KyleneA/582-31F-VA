export function fetchTournaments(){
    return fetch("/class14/tournaments.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status}`);
            }
            return response.json();
    })
}

export function fetchRegistration(){
    return fetch("/class14/registrations.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status}`);
            }
            return response.json();
        })
}