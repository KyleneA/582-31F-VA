export function fetchUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users").then(
        (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json()
        }
    )
}