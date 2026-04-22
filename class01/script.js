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

/* scope */
// block
a = 5;

if (a === 5){
	let message = "You guessed the number right";
	console.log(message);
}

console.log(message); // outside of if scope so message isn't defined

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

// mini check in (functions)
const firstName = "Jane";
const lastName = "Dough";

function getFullName(fn, ln){
    return `${fn} ${ln}`;
}

const fullName = getFullName(firstName, lastName);

function greetUser(fullName){
    console.log(`Greetings, ${fullName}!`);
}

greetUser(fullName);