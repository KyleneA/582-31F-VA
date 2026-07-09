export function fetchArtists(path) {
    return (
        fetch(path)
            .then((response) => {
                if (!response.ok) throw new Error(`HTTP ${response.status} Error`);

                return response.json();
        })
    );
}