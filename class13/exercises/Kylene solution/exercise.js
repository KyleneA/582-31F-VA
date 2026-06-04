console.log("=====EXERCISE1=====");

class Book{
    constructor(title, pages){
        this.title = title;
        this.pages = pages;
    }

    static isValidPageCount(value){
        if (value < 0 || typeof value !== "number") return false;
        else return true; 
    }

    get summary(){
        return `${this.title} has ${this.pages} pages`;
    }

    set pages(value){
        if (Book.isValidPageCount(value)){
            this.__pages = value;
        }
        else{
            throw new Error("The number of pages cannot be negative");
        }
    }

    get pages() {
        return this.__pages;
    }
}

const book = new Book("Lake", 354);
console.log(book.title, book.pages, book.summary);

console.log("=====EXERCISE2=====");

class BankAccount{
    constructor(owner, balance){
        this.owner = owner;
        this.balance = balance;
    }

    static isValidAmount(amount){
        if (amount < 0 || typeof value !== "number") {
            return false;
        }
        else return true
    }
    
    get balance() {
        return this.__balance;
    }
    
    set balance(value) {
        if (BankAccount.isValidAmount(value)){
            this.__balance = value;
        }
        else{
            throw new Error("Balance cannot be a negative number");
        }
    }
}

const bankAcc = new BankAccount("Bob", 12345);
console.log(bankAcc.owner, "has $", bankAcc.balance);

console.log("=====EXERCISE3=====");

class Course{
    static schoolName = "Vanier College";

    constructor(title, credits){
        this.title = title;
        this.credits = credits
    }
    
    set credits(value){
        if (value > 0 && typeof value === "number") {
            this.__credits = value;
        } else {
            throw new Error("Credits cannot be a negative number.")
        }
    }
    
    get credits() {
        return this.__credits;
    }
    
    get label() {
        return `${Course.schoolName} | ${this.title} | ${this.credits} credits.`
    }
}

const course = new Course("Web Interface Design 2", 3);
console.log(course.label);

console.log("=====EXERCISE4=====");

class Movie{
    constructor(title, rating) {
        this.title = title;
        this.rating = rating;
    }

    get description(){
        return `${this.title} has a rating of ${this.rating} stars.`
    }

    static isValidRating(value){
        if (value < 0 || value > 10 || typeof value !== "number") return false;
        console.log(value < 0, value > 10, value < 0 || value > 10);
        return true;
    }

    get rating() {
        return this.__rating;
    }

    set rating(value) {
        if (Movie.isValidRating(value)) {
            this.__rating = value;
        } else {
            throw new Error("Rating must be between 0 and 10");
        }
    }
}

const movie = new Movie("Jaws", 5);
console.log(movie.description)