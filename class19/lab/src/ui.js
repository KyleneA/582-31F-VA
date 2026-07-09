export default function renderArtists(artists, container) {
    container.innerHTML = '';

    artists.forEach(artist => {
        const id = artist.id;
        const name = artist.name;
        const genre = artist.genre;
        const stage = artist.stage;
        const time = artist.time;
        const country = artist.country;
        const headliner = artist.headliner;

        const card = document.createElement("artist-card");
        card.setAttribute("artist-id", id);
        card.setAttribute("name", name);
        card.setAttribute("genre", genre);
        card.setAttribute("stage", stage);
        card.setAttribute("time", time);
        card.setAttribute("country", country);
        card.setAttribute("headliner", headliner);

        container.appendChild(card);
    });
}