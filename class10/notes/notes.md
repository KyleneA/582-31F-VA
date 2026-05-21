## Prototypes
> [!Definition]
> JS object that JS can check when a property or methods isn't found directly on the object itself
> - Allows many objects to share the same method
>> Prototype lookup Steps:
>> 1. JS checks the object for the property
>> 2. if not in the object itself, checks the prototype
>> 

### Why prototypes?
- Avoids repeating methods
- Allows to share behavior
- Reduces duplication
- Helps us understand how JS classes work

### Designing with Prototypes
- Object-specific data belongs on the object
	- ex: name, title, price, availability, etc
- Shared methods, property belong on the prototype
	- method format `ObjectName.prototype.mehodName() = function () { ... };`
	- property format `ObjectName.prototype.propertyName = value;`
    - Cannot be defined in the constructor function!

```js
// Using constructor function to create the object
function Student(name, grade = "n/a") {
	this.name = name; // own property
	this.grade = grade; // own property
}

// new is necessary when creating the object instance
const s1 = new Student("Alice");
const s2 = new Student("Karim");

// Then using the prototype keyword to create the shared methods
Student.prototype.introduce = function () {
	return `Hi, I am ${this.name}`;
};

console.log(s1.introduce());
console.log(s2.introduce());
console.log(Object.getPrototypeOf(s1)); // returns the prototype of the specified object

// Shared property
Student.prototype.school = "ABC University"

console.log(s1.school); // -> "ABC University"
console.log(s2.school); // -> "ABC University"

// Shadowing a share property
s1.school = "DEF University";

console.log(s1.school); // -> "DEF University"
console.log(s2.school); // -> "ABC University"

```

> [!Note]
> Can use [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) method to get the prototype of any object 
> Can use [`hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) method to return Boolean of whether the object has its own property

## Comparing with Class Syntax
```js
// objects constructor function & prototype
//// Constructor function
function Book(title, author, available = true){
    this.title = title;
    this.author = author;
    this.available = available
}

//// Shared methods
Book.prototype.borrow = function () {
    if (this.available == true) {
        this.toggleAvailability();

        return `${this.title} by ${this.author} has been borrowed. | Available: ${this.available}`;
    }
    return `${this.title} by ${this.author} is not available to borrow. | Available: ${this.available}`
}

Book.prototype.returnBook =  function () {
    if (!this.available) {
        this.toggleAvailability();
        return `${this.title} by ${this.author} has been returned. | Available: ${this.available}`;
    }
    return `This copy of ${this.title} by ${this.author} is not ours. | Available: ${this.available}`
}

Book.prototype.displayInfo = function () {
    return `${this.title} by ${this.author} | Available: ${this.available}`;
};

Book.prototype.toggleAvailability = function () {
    if (this.available) this.available = false;
    else this.available = true;
    
    return `Toggled: ${this.title} by ${this.author} | Available: ${this.available}`;
}

//// Shared property
Book.prototype.genre = "Fiction";

//// Object instances
const book1 = new Book("Lake", "Banana Yoshimoto");
const book2 = new Book("Kitchen", "Banana Yoshimoto", false);
```
```js
// Class syntax
class BookClass {
	//// Shared property
    genre = "Fiction";
    
    //// Constructor
    constructor(title, author, available = true) {
        this.title = title;
        this.author = author;
        this.available = available;
    }

	//// Shared methods
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

//// class object instance
const book3 = new BookClass("Title1", "Author1");
const book4 = new BookClass("Title2", "Author2", false);
```
