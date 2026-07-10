import { fetchArtists } from "./api.js";
import renderArtists from "./ui.js";
import Artist from "./artist.js";

function main() {
    const lineupContainer = document.getElementById("artist-lineup-container");
    const detailsContainer = document.getElementById("artist-details-container");

    const loadBtn = document.getElementById("lineup-load-btn");
    const clearBtn = document.getElementById("lineup-clear-btn");
    const statusP = document.getElementById("lineup-load-status");

    const filterContainer = document.querySelector(".stage-filter-container");
    const allStages = document.getElementById("all-stages");
    const mainStage = document.getElementById("main-stage");
    const riverStage = document.getElementById("river-stage");
    const nightStage = document.getElementById("night-stage");
    const gardenStage = document.getElementById("garden-stage");

    const stageFilterBtns = [allStages, mainStage, riverStage, nightStage, gardenStage];
    const stageFilter = ["All Stages", "Main Stage", "River Stage", "Night Stage", "Garden Stage"];

    loadBtn.addEventListener("click", () => {
        lineupContainer.innerHTML = '';
        statusP.textContent = "Loading artist lineup...";
        loadBtn.disabled = true;

        stageFilterBtns.forEach((stageBtn) => {
            stageBtn.className = "btn";
        });
        allStages.className = "btn selected";

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

                    filterContainer.style.display = "flex";
                }, 1500);
            }).catch((error) => {
                setTimeout(() => {
                    statusP.textContent = `Artist lineup failed to load. ${error}`;
                    loadBtn.disabled = false;
                }, 750);
            })
    });

    document.addEventListener("artist-selected", (event) => {
        detailsContainer.innerHTML = '';

        detailsContainer.classList.add("view-active");
        lineupContainer.classList.add("view-active");

        const template = document.getElementById("details-card-template");
        const detailsCard = template.content.cloneNode(true);

        const nameId = detailsCard.querySelector(".artist-name-id");
        const genre = detailsCard.querySelector(".artist-genre");
        const country = detailsCard.querySelector(".artist-country");
        const stageHeadliner = detailsCard.querySelector(".artist-stage-headliner");
        const time = detailsCard.querySelector(".artist-time");

        nameId.textContent = `${event.detail.name} (#${event.detail.id})`;
        genre.textContent = `Genre: ${event.detail.genre}`;
        country.textContent = `Country: ${event.detail.country}`;
        stageHeadliner.textContent = event.detail.headliner === "true" ? `Stage: ${event.detail.stage} (HEADLINER)` : `Stage: ${event.detail.stage}`;
        time.textContent = `Time: ${event.detail.time}`;

        detailsContainer.appendChild(detailsCard);
    });

    clearBtn.addEventListener("click", () => {
        statusP.textContent = "Artist lineup cleared";
        clearBtn.disabled = true;
        
        lineupContainer.className = '';
        detailsContainer.className = '';
        filterContainer.style.display = "none";
        
        
        lineupContainer.innerHTML = '';
        detailsContainer.innerHTML = '';
        
        setTimeout(() => {
            statusP.textContent = "Ready to load artist lineup!";
            loadBtn.disabled = false;
        },1500);
    });

    stageFilterBtns.forEach((stageBtn, index) => {
        stageBtn.addEventListener(("click"), () => {
            if (stageBtn.className === "btn selected") {
                stageBtn.className = "btn";
                allStages.className = "btn selected";

                fetchArtists('./src/data/artists.json')
                .then((artists) => {
                    const artistInstances = [];

                    artists.forEach(artist => {
                        const newArtist = Artist.fromObject(artist);
                        
                        artistInstances.push(newArtist);
                    });

                    renderArtists(artistInstances, lineupContainer);
                });
                return;
            }

            stageBtn.className = "btn selected";

            const otherStages = stageFilterBtns.filter((stage) => stage !== stageBtn); 

            otherStages.forEach((stageBtn) => {
                stageBtn.className = "btn";
            });

            lineupContainer.innerHTML = '';

            fetchArtists('./src/data/artists.json')
            .then((artists) => {
                const artistInstances = [];

                artists.forEach(artist => {
                    if (artist.stage === stageFilter[index]) {
                        const newArtist = Artist.fromObject(artist);
    
                        artistInstances.push(newArtist);
                    }
                    else if (stageFilter[index] === "All Stages"){
                        const newArtist = Artist.fromObject(artist);

                        artistInstances.push(newArtist);
                    }
                });
                renderArtists(artistInstances, lineupContainer);
            }).catch((error) => {
                setTimeout(() => {
                    statusP.textContent = `Artist lineup failed to load. ${error}`;
                    loadBtn.disabled = false;
                }, 750);
            })
        });
    });
}

main();