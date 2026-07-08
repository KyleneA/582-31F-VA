function createPlayerCard(player) {
    const cardTemplate = document.getElementById("player-card-template");

    const clone = cardTemplate.content.cloneNode(true);

    const name = clone.querySelector(".player-name");
    const country = clone.querySelector(".player-country");
    const number = clone.querySelector(".player-number");
    
    name.textContent = player.name;
    country.textContent = "Country: " + player.country;
    number.textContent = "Number: " + player.number;

    return clone;
}

const playerCardsContainer = document.getElementById("player-cards-container");
console.log(playerCardsContainer);

const players = [
    { name: "Messi", country: "Argentina", number: 10 },
    { name: "Mbappé", country: "France", number: 10 },
    { name: "Endo", country: "Japan", number: 6 }
];

players.forEach((player) => {
    const newCard = createPlayerCard(player);

    playerCardsContainer.appendChild(newCard);
})