// load DOM elements
const input = document.getElementById("name-input");
const button = document.getElementById("greet-button");
const output = document.getElementById("output");

// add event listener to button
button.addEventListener("click", () => {
    const name = input.value.trim();

    if (name === "") {
        output.textContent = "Please enter something";
        return;
    }

    output.textContent = "Loading.";

    setTimeout(() => {
        output.textContent = "Loading..";
    }, 300);

    setTimeout(() => {
        output.textContent = "Loading...";
    }, 600);
    

    setTimeout(() => {
        output.textContent = `Hello, ${name}`;
    }, 1000);
})

    // continuation function
        // take input value + trim
        // validate not empty
            // if empty, update output to "Please enter something"
        // after 1000ms, update output to "Hello, input_value"