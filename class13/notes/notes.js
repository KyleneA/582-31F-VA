console.log("=====GETTER=====");

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getter function
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

const p1 = new Person("Bob", "Builder");

console.log("full name: ", p1.fullName);

console.log("==========");

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    get area() {
        return this.width * this.height;
    }
}

const rect = new Rectangle(4,5);
console.log("area: ", rect.area)

console.log("=====SETTER=====");

class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price; // public property => calls the setter
        console.log("public");
    }
    
    // private property
    set price(value) {
        if (value < 0) {
            throw new Error("Price cannot be negative");
        }
        this.__price = value;
        console.log("set private");
    }
    
    // private property
    get price() {
        console.log("get private");
        return this.__price;
    }
}

const prod1 = new Product("Keyboard", 49.99);
console.log(prod1.price);
prod1.price = 50;
console.log(prod1.price);

console.log("==========");

class User {
    constructor(username){
        this.username = username;
    }

    set username(value){
        this.__username = value.trim();
    }

    get username() {
        return this.__username;
    }
}

const u1 = new User("    DoraExplorador  ");
console.log(u1.username);

console.log("==========");

class Bug{
    constructor(name) {
        this.name = name;
    }

    set name(value){
        this.__name = value; 
        // this.name = value; // recursive call (calls itself in loop)
    }

    get name() {
        return this.__name;
    }
}

const bug = new Bug("ladybug");
console.log(bug.name)

console.log("=====STATIC=====");

class MathHelper {
    static add(a, b) {
        return a + b;
    }
}

// To call write like
const addResult = MathHelper.add(5,10);
console.log(addResult);