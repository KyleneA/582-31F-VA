console.log("start");
console.log("middle");
console.log("end");

/* deffered execution */
// setTimeout() 
console.log("start (timeout)");

setTimeout(() => {
    console.log("middle (timeout)");
}, 50);

console.log("end (timeout)");

// callback function 
function doSomethingLater(callback) {
    console.log("doing setup...");

    callback();
}

doSomethingLater(() => {
    console.log("Hello");
});

/* DOM Review */
const title = document.getElementById("title");
const description = document.querySelector("p.description");
const output = document.getElementById("output");

console.log(title, description.textContent, output);

//updating DOM content
output.textContent = "Add something new here";

const topicsList = document.getElementById("topic-list");
const topics = ["one", "two", "three"];

for (const topic of topics){
    const li = document.createElement("li");
    li.textContent = topic;

    topicsList.append(li);
}

// Event handling
const button = document.getElementById("my-button");
console.log(button);

// button.addEventListener("click", () => {
//     console.log("button is clicked");
// });

const nameInput = document.getElementById("name-input");

button.addEventListener("click", () => {
    const name = nameInput.value.trim();

    output.textContent = "Hello there, " + name;
});

// input event
const previewOutput = document.getElementById("preview-output");

nameInput.addEventListener("input", () => {
    console.log("typing in input..");

    previewOutput.textContent = `Typing: ${nameInput.value}`;
});