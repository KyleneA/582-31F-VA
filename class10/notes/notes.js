// Using constructor function to create the object
function Student(name) {
	this.name = name;
}

const s1 = new Student("Alice");
const s2 = new Student("Karim");

// console.log(s1.name);
// console.log(s2.name);

// Then using the prototype keyword to create the shared methods
Student.prototype.introduce = function () {
	return `Hi, I am ${this.name}`;
};

// console.log(s1.introduce());
// console.log(s2.introduce());
// console.log(Object.getPrototypeOf(s1)); // returns the prototype of the specified object

function Book(title, author, available = true){
    this.title = title;
    this.author = author;
    this.available = available
}

Book.prototype.borrow = function () {
    if (this.available == true) {
        // this.available = false;
        this.toggleAvailability();

        return `${this.title} by ${this.author} has been borrowed. | Available: ${this.available}`;
    }
    return `${this.title} by ${this.author} is not available to borrow. | Available: ${this.available}`
}

Book.prototype.returnBook =  function () {
    if (!this.available) {
        // this.available = true;
        this.toggleAvailability();
        return `${this.title} by ${this.author} has been returned. | Available: ${this.available}`;
    }
    return `This copy of ${this.title} by ${this.author} is not ours. | Available: ${this.available}`
}

Book.prototype.displayInfo = function () {
    return `${this.title} by ${this.author} | Available: ${this.available}`;
};

const book1 = new Book("Lake", "Banana Yoshimoto");
const book2 = new Book("Kitchen", "Banana Yoshimoto", false);

const demoBtn = document.getElementById("run-demo-btn");
const output = document.getElementById("output");

demoBtn.addEventListener("click", () => {
    output.innerHTML = `
        <p>${book1.displayInfo()}</p>
        <p>${book1.borrow()}</p>
        <p>${book1.returnBook()}</p>
        <p>${book1.returnBook()}</p>
        <p>${book1.toggleAvailability()}</p>
        <p>${book1.displayInfo()}</p>
        <hr>
        <p>${book2.displayInfo()}</p>
        <p>${book2.returnBook()}</p>
        <p>${book2.borrow()}</p>
        <p>${book2.borrow()}</p>
        <p>${book2.toggleAvailability()}</p>
        <p>${book2.displayInfo()}</p>
    `;
});

console.log(Object.getPrototypeOf(book1) === Book.prototype);
console.log(book1.hasOwnProperty("title"));
console.log(book1.hasOwnProperty("displayInfo"));

// Independent Tasks
Book.prototype.toggleAvailability = function () {
    if (this.available) this.available = false;
    else this.available = true;
    
    return `Toggled: ${this.title} by ${this.author} | Available: ${this.available}`;
}

console.log(book1.displayInfo === book2.displayInfo);

// Prototype property
Book.prototype.genre = "Fiction";
console.log("book1", book1.genre);
console.log("book2", book2.genre);

// shadow property
book1.genre = "Coming of age";
console.log("book1", book1.genre);
console.log("book2", book2.genre);

// Challenge Tasks
function Author(name, country) {
    this.name = name;
    this.country = country;
}

Author.prototype.describe = function () {
    return `${this.name} is an author from ${this.country}`;
}

// comparing with Class syntax
class BookClass {
    genre = "Fiction";
    
    constructor(title, author, available = true) {
        this.title = title;
        this.author = author;
        this.available = available;
    }

    displayInfo() {
        return `${this.title} by ${this.author} | Available: ${this.available}`;
    }

    toggleAvailability() {
        if (this.available) this.available = false;
        else this.available = true;
        
        return `Toggled: ${this.title} by ${this.author} | Available: ${this.available}`;
    }

    borrowBook() {
        if (this.available == true) {
            this.toggleAvailability();
    
            return `${this.title} by ${this.author} has been borrowed. | Available: ${this.available}`;
        }
        return `${this.title} by ${this.author} is not available to borrow. | Available: ${this.available}`
    }

    returnBook() {
        if (!this.available) {
            // this.available = true;
            this.toggleAvailability();
            return `${this.title} by ${this.author} has been returned. | Available: ${this.available}`;
        }
        return `This copy of ${this.title} by ${this.author} is not ours. | Available: ${this.available}`
    }
}

const book3 = new BookClass("Title1", "Author1");
const book4 = new BookClass("Title2", "Author2", false);

console.log(book1.displayInfo(), typeof book1, book1.genre);
console.log(book2.displayInfo(), typeof book2, book2.genre);
console.log("book1.displayInfo === book2.displayInfo", book1.displayInfo === book2.displayInfo);
console.log("------");
console.log(book3.displayInfo(), typeof book3, book3.genre);
console.log(book4.displayInfo(), typeof book4, book4.genre);
console.log("book3.displayInfo === book4.displayInfo", book3.displayInfo === book4.displayInfo);

console.log("-----------");

// challenge 3
console.log(book2.hasOwnProperty("title")); // -> true
console.log(book2.hasOwnProperty("genre")); // -> false
console.log(book2.hasOwnProperty("displayInfo")); // -> false
book2.genre = "Romance";
console.log(book2.hasOwnProperty("title")); // -> true
console.log(book2.hasOwnProperty("genre")); // -> true
console.log(book2.hasOwnProperty("displayInfo"));// -> false