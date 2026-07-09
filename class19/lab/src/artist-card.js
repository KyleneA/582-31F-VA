class ArtistCard extends HTMLElement {
    connectedCallback(){
        this.render();
    }

    getArtistData() {
        const id = this.getAttribute("artist-id").padStart(3, "0");
        const name = this.getAttribute("name");
        const genre = this.getAttribute("genre");
        const stage = this.getAttribute("stage");
        const time = this.getAttribute("time");
        const country = this.getAttribute("country");
        const headliner = this.getAttribute("headliner");

        const artistData = {
            id: id,
            name: name,
            genre: genre,
            stage: stage,
            time: time,
            country: country,
            headliner: headliner,
        };

        return artistData;
    }

    renderStyle() {
        return `
            <style>
                .artist-card {
                    background-color: rgba(255, 215, 0, 0.05);
                    border: 1px solid rgba(255, 215, 0, 0.6);
                    padding: 10px;
                    border-radius: 14px;
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
            
                    .card-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
            
                        .genre-badge {
                            padding: 10px 15px;
                            border-radius: 10px;
                            background-color: rgba(255, 215, 0, 0.3);
                            text-transform: capitalize;
                            }
                            
                        .artist-id {
                            text-align: right;
                        }
            
                        .headliner {
                            font-weight: 700;
                            display: none;
                        }

                        .headliner.active {
                            display: inline-block;
                        }
                    }
            
                    .card-body {
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        margin-bottom: 10px;
            
                        .artist-info,
                        .stage-info {
                            display: flex;
                            gap: 10px;
                        }

                        .artist-info{
                            justify-content: center;
                            align-items: end;
                        }
            
                        .stage-info{
                            display: flex;
                            gap: 10px;
                            justify-content: space-around;
                            align-items: end;
            
                            .stage,
                            .time {
                                display: flex;
                                gap: 10px;
                                align-items: center;
                                text-transform: capitalize;
                            }
                        }
                    }
            
                    .card-footer {
                        .btn {
                            display: inline-block;
                            width: 100%;
                            padding: 10px 20px;
                            background-color: gold;
                            border: none;
                            border-radius: 4px;
                            font-weight: 600;
                        }
                        
                        .btn:hover {
                            background-color: rgba(255, 215, 0, 0.6);
                        }
                        
                        .btn:disabled {
                            background-color: rgba(255, 215, 0, 0.4);
                        }
                    }
                }
            </style>
        `;
    }

    setCardHeader(clone, artistData) {
        const genre = clone.querySelector(".genre-badge");
        const id = clone.querySelector(".artist-id");
        const headliner = clone.querySelector(".headliner");
        genre.textContent = artistData.genre;
        id.textContent = `#${artistData.id}`;
        if (artistData.headliner === "true") {
            headliner.classList.add("active");
        }
    }

    setCardBody(clone, artistData) {
        const name = clone.querySelector(".artist-name");
        const country = clone.querySelector(".artist-country");
        name.textContent = artistData.name;
        country.textContent = `(${artistData.country})`;

        const stage = clone.querySelector(".artist-stage");
        const time = clone.querySelector(".artist-time");
        stage.textContent = artistData.stage;
        time.textContent = artistData.time;
    }

    setCardCustomEvent(clone, artistData) {
        const viewBtn = clone.querySelector(".btn");

        viewBtn.addEventListener("click", () => {
            
            const event = new CustomEvent("artist-selected", {
                composed: true,
                detail: {
                    id: artistData.id,
                    name: artistData.name,
                    genre: artistData.genre,
                    stage: artistData.stage,
                    time: artistData.time,
                    country: artistData.country,
                    headliner: artistData.headliner,
                }
            });
            document.dispatchEvent(event);
        });
    }

    renderCard() {
        const template = document.getElementById("artist-card-template");
        const clone = template.content.cloneNode(true);
        const artistData = this.getArtistData();

        this.setCardHeader(clone, artistData);
        this.setCardBody(clone, artistData);
        this.setCardCustomEvent(clone, artistData);

        return clone;
    }

    render() {
        const shadow = this.attachShadow({ mode: "open"});

        const style = this.renderStyle();
        const card = this.renderCard();
        
        shadow.innerHTML = `
            ${style}
        `;

        shadow.appendChild(card);
    }
}

customElements.define("artist-card", ArtistCard);