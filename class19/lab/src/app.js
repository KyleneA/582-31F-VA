import { fetchArtists } from "./api.js";
import renderArtists from "./ui.js";
import Artist from "./artist.js";

function main() {
    const lineupContainer = document.getElementById("artist-lineup-container");
    const detailsContainer = document.getElementById("artist-details-container");

    const loadBtn = document.getElementById("lineup-load-btn");
    const clearBtn = document.getElementById("lineup-clear-btn");
    const statusP = document.getElementById("lineup-load-status")

    loadBtn.addEventListener("click", () => {
        lineupContainer.innerHTML = '';
        statusP.textContent = "Loading artist lineup...";
        loadBtn.disabled = true;

        fetchArtists('./src/data/artists.json')
            .then((artists) => {
                const artistInstances = [];

                artists.forEach(artist => {
                    const newArtist = Artist.fromObject(artist);

                    artistInstances.push(newArtist);
                });

                return artistInstances;
            }).then((artists) => {
                setTimeout(() => {
                    statusP.textContent = "Artist lineup has loaded successfully!"
                    renderArtists(artists, lineupContainer);
                    clearBtn.disabled = false;
                }, 1500);
            }).catch((error) => {
                setTimeout(() => {
                    statusP.textContent = `Artist lineup failed to load. ${error}`;
                    loadBtn.disabled = false;
                }, 750);
            })
    });

    
}

main();