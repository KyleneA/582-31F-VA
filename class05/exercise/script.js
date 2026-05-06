const loadBtn = document.getElementById("user-btn");
const statusP = document.getElementById("status");
const output = document.getElementById("output");

loadBtn.addEventListener("click", () => {
    statusP.textContent = "Loading users..."
    output.innerHTML = "";

    const ul = document.createElement("ul");
    output.appendChild(ul);
    
    const fetchUsers = fetch("https://jsonplaceholder.typicode.com/users");

    fetchUsers
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            for (let i = 0; i < 5; i++){
                const li = document.createElement("li");
                li.textContent = result[i].username;
                ul.appendChild(li);
            }

            statusP.textContent = "Users loaded successfully!"
        })
        .catch((error) => {
            console.log(error);
            statusP.textContent = "User load failed."
        })
});