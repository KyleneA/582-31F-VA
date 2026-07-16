// // review
// // fetch("https://jsonplaceholder.typicode.com/users/6")
// //     .then((response) => {
// //         console.log("response:", typeof(response), response); // promise
// //         return response.json(); // method that parses response into JS object
// //     })
// //     .then((user) => {
// //         console.log("user: ");
// //         console.log(typeof(user));
// // 	    console.log(user); // no longer JSON text
// //         console.log(user.name);
// //         return user;
// //     })
// //     .then((user) => {
// // 	    console.log(JSON.stringify(user, null, 2)); // properties to pretty print
// //     });

// const button = document.getElementById("load-events");
// const container = document.getElementById("events");

// button.addEventListener("click", async () => {
//     const response = await fetch("events.json");
//     const events = await response.json();

//     container.innerHTML = "";

//     events.forEach((event) => {
//         const article = document.createElement("article");

//         article.innerHTML = `
//             <h2>${event.title}</h2>
//             <p>${event.artist}</p>
//         `;

//         container.appendChild(article);
//     });
// })

import { getEvents } from "./api.js";
import { Event } from "./event.js";
import { renderLoading, renderEmpty, renderError, renderEvents } from "./ui.js";

const loadButton = document.getElementById("load-events");
const genreFilter = document.getElementById("genre-filter");

let events = [];

async function loadEvents() {
    renderLoading();

    loadButton.disabled = true;
    genreFilter.disabled = true;

    try {
        const rawEvents = await getEvents();

        console.log("Raw API data: ", rawEvents);

        events = rawEvents.map(
            (item) => new Event(
                item.id,
                item.title,
                item.artist,
                item.genre,
                item.venue,
                item.date,
                item.price
            ),
        );

        console.table(events);
        renderEvents(events);
    } catch (error) {
        console.error("Failed to load events: ", error)

        renderError(error.message);
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener("click", () => {
    loadEvents();
})

function handleGenreFilter() {
    const selectedGenre = genreFilter.value;

    if (selectedGenre === "") {
        renderEvents(events);
        return
    }

    const filteredEvents = events.filter(
        (event) => event.genre === selectedGenre,)
        
        renderEvents(filteredEvents);
}