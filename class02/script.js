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

