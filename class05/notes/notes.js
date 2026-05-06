function getStudentData(){
    return new Promise((resolve) => {
        resolve({name: "Bob", program: "web dev"});
    });
}

getStudentData().then((result) => {
    console.log(result);
});


fetch("https://jsonplaceholder.typicode.com/users/1");

const fetchRequestGood = fetch("https://jsonplaceholder.typicode.com/users/1");
console.log(fetchRequestGood);

fetchRequestGood
    .then((response) => {
        console.log("Status: ", response.status);
        console.log("OK: ", response.ok)
        return response.json() // parses response to JSON format 
    })
    .then((result) => {
        console.log("FetchRequestGood: ");
        console.log("name: ",result.name);
        console.log("username: ",result.username);
        console.log("email: ",result.email);
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

    const fetchRequestBad = fetch("https://jsonplaceholder.typicode.com/users/100");
    console.log(fetchRequestBad);
    
    fetchRequestBad
        .then((response) => {
            console.log("Status: ", response.status);
            console.log("OK: ", response.ok)
            return response.json() // parses response to JSON format 
        })
        .then((result) => {
            console.log("FetchRequestBad: ");
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        });

/*Fetch with DOM*/ 
const loadBtn = document.getElementById("user-btn");
const statusP = document.getElementById("status");
const output = document.getElementById("output");

loadBtn.addEventListener("click", () => {
    statusP.textContent = "Loading user..."
    output.innerHTML = "";

    const userFetch = fetch("https://jsonplaceholder.typicode.com/users/50");
    
    userFetch
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const username = document.createElement("h2");
            username.textContent = data.username; // or data[username]
            output.appendChild(username);

            statusP.textContent = "User loaded successfully!";
        })
        .catch((error) => {
            statusP.text = "Failed to load user...";
            console.log(error);
        });
});