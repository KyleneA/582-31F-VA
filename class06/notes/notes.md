## JSON
JavaScript Object Notation 
=> **text format** used to represent structured data
- essentially 1 reeeeally long string
### Serialization
turns data into text
### Deserialization
turns text into data
### Valid types in JSON
- string
- numbers
- boolean
- null
- object (js or other)
- array

> [!important]
> NOT SUPPORTED:
> - functions
> - comments
> - undefined
### Parsing JSON
using `JSON.parse()`
```js
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
```
### Stringify
using `JSON.stringify()`
- can have 3 paramaters
	- value to stringify
		- A JavaScript value, usually an object or array, to be converted.
	- replacer
		- An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
	- space 
		- Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read

```js
const arrayJS = ['html', 'css', 'js'];
const arrayJSToJSON = JSON.stringify(arrayJS);
console.log('*From', arrayJS, `(${typeof arrayJS})`, 'to', arrayJSToJSON, `(${typeof arrayJSToJSON})`);
```
### Limitations
```js
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
```

### JS Object vs JSON
**JS Object**
- lives as JS value
- can have methods
- keys don't need quotes
- uses JS syntax rules

**JSON**
- is plain text
- used for exchanging data
- keys MUST use **double quotes**
- must follow string JSON syntax

## JSON in fetch
```js
fetch("https://jsonplaceholder.typicode.com/users/6")
    .then((response) => {
        console.log(response);
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
```
