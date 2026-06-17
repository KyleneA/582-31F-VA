class MovieBox extends HTMLElement {
    connectedCallback() {
        return this.render();
    }

    getTitle(){
        const title = this.getAttribute("title") || "unknown";
        return title;
    }

    getYear(){
        const year = this.getAttribute("year") || "unknown";
        return year;
    }

    getDirector(){
        const director = this.getAttribute("director") || "unknown";
        return director;
    }

    getPosterURL(){
        const posterURL = this.getAttribute("poster-url") || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1920px-No-Image-Placeholder.svg.png"
        return posterURL;
    }
    
    renderStyle(title, year, director, posterURL){
        return `
            <style>
                .movie-card{
                    padding: 20px 30px;
                    background-color: midnightblue;
                    color: snow;
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .movie-card img{
                    height: 200px;
                }
                
                .card-header .entry{
                    display: flex;
                    gap: 10px;
                }

                .card-header .name{
                    font-weight: 700;
                }
                
            </style>

            <div class='movie-card'>
                <img src=${posterURL} alt=${title} movie poster>

                <div class='card-header'>
                    <h2> ${title} </h2>
                    <div class='entry'> 
                        <p class='name'> Release year: </p> 
                        <p> ${year} </p>
                    </div>
                    <div class='entry'>
                        <p class='name'> Directed by: </p> 
                        <p> ${director} </p>
                    </div>
                </div>
            </div>
        `
    }

    render() {
        const title = this.getTitle();
        const year = this.getYear();
        const director = this.getDirector();
        const poster = this.getPosterURL();

        const movieBox = this.attachShadow({mode: "open"});
        movieBox.innerHTML = this.renderStyle(title, year, director, poster);

        return movieBox;
    }
}

customElements.define("movie-box", MovieBox);