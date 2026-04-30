const btn = document.getElementById("load-button");
const output = document.getElementById("output");
const input = document.getElementById("input");
const statusP = document.getElementById("status");

function fakeLoad() {
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Content loaded");
        }, 3000);
    });
    return promise;
}

btn.addEventListener("click", () => {
    output.textContent = "Loading";

    setTimeout(() => {
        output.textContent = "Loading."
    }, 1000);
    
    setTimeout(() => {
        output.textContent = "Loading.."
    }, 2000);
    
    setTimeout(() => {
        output.textContent = "Loading..."
    }, 2900);

    if (input.value === "hi"){
        fakeLoad().then((result) => {
            statusP.textContent = result;
        });

        setTimeout(() => {
            output.textContent = input.value;
        },3000);
    }
});