fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((user) => {
        console.log(user.name);
    });

let obj = {
    name: "Leanne Graham",
    address: "123 street",
    // etc
};

// JS Object
const student = {
    name: "Leanne Graham",
    address: "123 street",
    // etc
};

// JSON file
const jsonText = '{"name": "Leanne Graham", "address": "123 street", "etc": "etc"}';

// PARSING
const studentJSON = '{"name": "Leanne Graham", "address": "123 street", "etc": "etc"}';
const parsedStudent = JSON.parse(studentJSON);
console.log(typeof studentJSON, studentJSON);
console.log(typeof parsedStudent, parsedStudent); 

// array
const arrayJSON = '["html", "css", "js"]';
const topics = JSON.parse(arrayJSON);
console.log(typeof arrayJSON, arrayJSON);
console.log(typeof topics, topics);

// nested JSON
const nestedJSON = `
{
    "name":"Alice",
    "address":{
        "city": "Montreal",
        "postalCode": "H1A 1A1"
    }
}`;

const parsedNestedJSON = JSON.parse(nestedJSON);

console.log("nested json");
console.log(nestedJSON, typeof nestedJSON);
console.log(parsedNestedJSON, typeof parsedNestedJSON);

// bad example
const badJSON = "{name: 'Alice'}";
// syntax errors
// should be single quote outside AND
// should have key with double quotes

// STRINGIFY
// js object
const product = {
    name: "mouse",
    category: "electronics",
    price: 10.55,
};

const productJSON = JSON.stringify(product);
console.log("JS object");
console.log(typeof product, product);
console.log("JSON text");
console.log(typeof productJSON, productJSON);

const productJSONReadable = JSON.stringify(product, null, 2);
console.log(productJSONReadable);

// array
const arrayJS = ['html', 'css', 'js'];
const arrayJSToJSON = JSON.stringify(arrayJS);
console.log('*From', arrayJS, `(${typeof arrayJS})`, 'to', arrayJSToJSON, `(${typeof arrayJSToJSON})`);

// Limitations
const book = {
    name: "Lake",
    author: "Banana",
    read() {
        console.log("read");
    },
    price: undefined,
};

console.log(book);

const bookJSON = JSON.stringify(book);
console.log(bookJSON); // => will ignore read function & price because JSON is for data, not behaviour 

// Understanding what happens to JSON during fetch
fetch("https://jsonplaceholder.typicode.com/users/6")
    .then((response) => {
        console.log("fetch user 6",response);
        return response.json(); // parses response into JS object
    })
    .then((user) => {
	    console.log(user); // no longer JSON text
        console.log(user.name);
        return user;
    })
    .then((user) => {
	    console.log(JSON.stringify(user, null, 2)); // properties to pretty print
    });