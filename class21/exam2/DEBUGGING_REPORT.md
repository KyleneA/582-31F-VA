> Document **six** significant bugs.
>
> For each bug, include:
> - file name
> - original defective code or behaviour
> - correction
> - explanation of why the original failed
> - how the correction was tested

-----

## 1. Missing Script Type 
1. File name 
    - index.html 
2. Original code or behaviour
    - `<script src="./js/app.js"></script>`
3. Correction 
    - `<script type="module" src="./js/app.js"></script>`
4. Explanation 
    - Without the type module, the app.js code will not be able to import or export functions or classes
5. How tested fix
    - I refreshed the page and checked if the module error in the console disappeared.
  

 ## 2. Missing await on fetch elements 
1. File name 
    - api.js
    - app.js
2. Original code or behaviour
    ``` api.js
    const artistResponse = fetch("./artist.json");
    const performanceResponse = fetch("./performances.json");

    ...

    const responses = Promise.all(artistResponse, performanceResponse);
    ```
    ``` app.js
    const data = getFestivalData();

    const artists = data.artists.map(
    (item) => new Artist(item.id, item.name, item.country, item.genre),
    );

    performances = data.performances.map((item) => {
    const artist = artists.filter((artist) => artist.id === item.artistId);
    ...
    });
    
    ```
3. Correction 
    ``` api.js
    const artistResponse = await fetch("./artists.json");
    const performanceResponse = await fetch("./performances.json");

    const responses = Promise.all([artistResponse, performanceResponse]);
    ```
    ``` app.js
    const data = await getFestivalData();

    const rawArtitstData = await data.artists;
    const rawPerformanceData = await data.performances;
    ```
4. Explanation 
    - Without the await, the execution of the code might occur before it needs to be and may cause errors
5. How tested fix
    - Checked console for error logged relating to loading error

## 3. Incorrect association of argument to property 
1. File name 
    - Artist.js
2. Original code or behaviour
    ```
    constructor(id, name, country, genre) {
        this.id = name;
        this.artistName = id;
        this.country = genre;
        this.genre = country;
    }

    ...

    get displayLabel() {
        return `${this.artistName} — ` + `${this.genre}`;
    }
    ```
3. Correction 
    ```
    constructor(id, name, country, genre) {
        this.id = id;
        this.artistName = name;
        this.country = country;
        this.genre = genre;
    }
    
    ...

    get displayLabel() {
        return `${this.artistName} — ${this.country}`;
    }
    ```
4. Explanation 
    - Leaving the Artist class like this would make using and accessing the properties very convoluted because the property names would not hold any semantic meaning anymore. For example, to display the artist's name and country the original code had to use the genre property.
5. How tested fix
    - I console logged the Performance instances and to double check that the artist fields are correctly associated.

## 4. Ticket price and Tickets remaining not stored as Number 
1. File name 
    - Performance.js
2. Original code or behaviour
    ```
    export class Performance {
        constructor (id, title, artist, stage, time, ticketPrice, ticketsRemaining) {
            ...
            this.ticketPrice = String(ticketPrice);
            this.ticketsRemaining = String(ticketsRemaining);
        }
    }
    ```
3. Correction 
    ```
    export class Performance {
        constructor (id, title, artist, stage, time, ticketPrice, ticketsRemaining) {
            ...
            this.ticketPrice = Number(ticketPrice);
            this.ticketsRemaining = Number(ticketsRemaining);
        }
    }
    ```
4. Explanation 
    - If ticketPrice and ticketsRemaining remained as Strings the operations in the Performance method would result in just combining the inputs one after the other rather than performing the desired operations.
5. How tested fix
    - Checked that the summary displayed correct numbers.

## 5. Incorrect method used to get artist 
1. File name 
    - app.js
2. Original code or behaviour
    - `const artist = artists.filter((artist) => artist.id === item.artistId);`
3. Correction 
    - `const artist = artists.find((artist) => artist.id === item.artistId);`
4. Explanation 
    - Performances only have 1 artist so there was no need to use the filter method which returns a list of Artist. This caused problems when trying to access Artist properties because what returned was an array with the artist rather than the artist instance itself. The find method fixes this problem.
5. How tested fix
    - I console logged Performance instances to see if the Artist object stored was a list or the Artist instance

## 6. Placing render method in wrong area 
1. File name 
    - PerformanceCard.js
2. Original code or behaviour
    ```
    set performance(value) {
        this.performance = value;
        this.render;
    }
    ```
3. Correction 
     ```
    set performance(value) {
        this._performance = value;
    }

    ...

    connectedCallback() {
        this.render();
    }
    ```
4. Explanation 
    - Leaving the render method in the set performance method makes the program render the card as soon as the card is created leaving it empty. Rendering in connectedCallback allows to render after the _performance property is set.
5. How tested fix
    - I console logged the created cards and checked that the content was not empty.