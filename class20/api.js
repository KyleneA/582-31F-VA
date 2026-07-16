export async function getEvents() {
    const response = await fetch("./events.json");

    // checking validation
    if (!response.ok) {
        throw new Error (
            `Unable to load events.
                HTTP status: ${response.status}`,
        );
    }

    return response.json();
}