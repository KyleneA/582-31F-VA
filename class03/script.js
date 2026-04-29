const promiseRes = Promise.resolve("first resolved promise");
console.log(promiseRes);
// const promiseRej = Promise.reject("first rejected promise");
// console.log(promiseRej); // uncomment to see how uncaught reject displays

// Basic Resolved Promise
const resolvedPromise = Promise.resolve("Hello world")
console.log("---");
resolvedPromise.then((result) => {
    console.log(`Basic Resolve PromiseResult: ${result}`); // => Hello world
});
console.log(`Basic Resolve: Calling const resolvedPromise ${resolvedPromise}`);

// Basic Reject Promise
const rejectedPromise = Promise.reject("Failed to load")
console.log("---");
rejectedPromise.catch((error) => {
    console.log(`Basic Reject PromiseResult: ${error}`); // => Failed to load
});
console.log(`Basic Reject: Calling const rejectedPromise ${rejectedPromise}`);

// Adding both reject & resolve in a single flow
const success = true;

const myPromise = new Promise((resolve, reject) => {
    if (success === true) {
        reject("Operation Failed");
    } else {
        resolve("Operation Successful");
    }
});

myPromise
    // when resolved
    .then((result) => {
        console.log("--- myPromise");
        console.log(result);
    })
    // when rejected
    .catch((error) => {
        console.log("--- myPromise");
        console.log(error);
    });

// With other asynchronous operations
const success2 = true;
const myPromise2 = new Promise((resolve, reject) => {
    if (success2 === true) {
        setTimeout(() => {
            resolve("Data Loaded");
        }, 1000);
    } else {
        setTimeout(() => {
            reject("Data Load Failed");
        }, 1000);
    }
});

myPromise2
    // when resolved
    .then((result) => {
        console.log("--- myPromise2");
        console.log(result);
    })
    // when rejected
    .catch((error) => {
        console.log("--- myPromise2");
        console.log(error);
    });

// Promises within a function
function checkNumber(number){
    const promise = new Promise((resolve, reject) => {
        if (number > 10){
            resolve("Number is greater than 10");
        } else {
            reject("Number is smaller or equal to 10");
        }
    });
    return promise;
}

checkNumber(10)
    .then((result) => {
        console.log("--- checkNumber(10)");
        console.log(result);
    })
    .catch((error) => {
        console.log("--- checkNumber(10)");
        console.log(error);
    });

checkNumber(15)
    .then((result) => {
        console.log("--- checkNumber(15)");
        console.log(result);
    })
    .catch((error) => {
        console.log("--- checkNumber(15)");
        console.log(error);
    });

