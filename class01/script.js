console.log("hello world");

/* Variables check in */
// let or const?
let page = 1; // current page
const maxItems = 20; // max numbers of items in website
const categories = ["movies", "books"]; // category of item



/* objects */
const student = {
	name: "sam",
	grade: 90,
};

// reassigning the name property
student.name = "joe";

const product = {
    name: "Keyboard",
    price: 49.99,
    inStock: true,
    describe: function () {
        return this.name + " costs $" + this.price;
    },
};

console.log(product.name);
// calling object function
console.log(product.describe());



/* scope */
// block
const a = 5;

if (a == 5){
	let message = "You guessed the number right";
	console.log(message);
}

//console.log(message); // outside of if scope so message isn't defined

// function
function showUser(){
    const username = "Mina";
    console.log(`${username} is logged in`);
}

showUser();



/* functions */
// void function - execute without returning anything
function greetUser(name){
	console.log(`Hello, ${name}! I hope you are good!`);
}

const name = "Nora";
greetUser(name);

// return function - executes and returns something
function add(num1, num2){
	return num1 + num2;
}

console.log("Result: ", add(2, 5));



/* 1 responsibility per function  */
function calcTotal(price, qty){
	return price * qty;
}

function formatPrice(amount){
	return "$" + amount.toFixed(2);
}

const totalPrice = calcTotal(2.55, 11);

console.log(totalPrice, formatPrice(totalPrice));



/* Arrays */
// methods
const fruits = ["apple", "banana", "cherry", "dates"];

fruits.push = "orange";
fruits[0]; // => "apple"
fruits[fruits.length - 1]; // => "orange"

const prices = [10, 20, 30, 40];
console.log(prices);


/* Find Function */
// find function finds the first occurence that
// passes the condition
const firstLongName = fruits.find(function (fruit) {
    return fruit.length > 5;
});
console.log("Find function: " + firstLongName);


/* filter function */
// filter function creates an array of all elements
// that pass the condition within the array.
const longFruitNames = fruits.filter(function (fruit) {
    return fruit.length > 5;
});
console.log("Filter Function: ");
console.log(longFruitNames);


/* Map function */
// transforms each elements of the array and stores it
// in a new array.
const formattedFruits = fruits.map(function (fruit) {
    return fruit.toUpperCase();
});

console.log("Map Function: ");
console.log(formattedFruits);

// loops
console.log("===========");
console.log("Lambda: ");
fruits.forEach((fruit) => console.log(fruit));

console.log("===========");
console.log("Callback fn: ");
fruits.forEach(function (fruit) {
    console.log(fruit);
});

console.log("===========");
console.log("for loop: ");
for (const fruit of fruits) {
    console.log(fruit);
}

console.log("===========");
console.log("with indexes loop: ");
for (let i = 0; i < fruits.length; i++) {
    if (i == 1) {
        // optional, if you want :D
        // here we have more control over indexes
        console.log(fruits[i]);
    }
}

console.log("===========");
console.log("with while loop: ");
let index = 0;
while (index < fruits.length) {
    console.log(fruits[index]);
    index++;
}
