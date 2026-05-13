const loadUserBtn = document.getElementById("load-btn");
const statusP = document.getElementById("status");
const profileSection = document.getElementById("user-profile");

loadUserBtn.addEventListener("click", () => {
    statusP.textContent = "Loading user...";
    
    fetch("https://jsonplaceholder.typicode.com/users/5")
    .then((response) => {
        if (!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    })
    .then((user) => {
            const userDiv = document.createElement("div");
            userDiv.id = "profile-div";
            const nameH3 = document.createElement("h3");
            const usernameP = document.createElement("p");
            const emailP = document.createElement("p");
            userDiv.append(nameH3, usernameP, emailP);

            nameH3.textContent = user.name ?? "n/a";
            usernameP.textContent = "Username: " + user.username ?? "n/a";
            emailP.textContent = "Email: " + user.email ?? "n/a";
            
            setTimeout(() => {
                profileSection.appendChild(userDiv);
                statusP.textContent = "User loaded successfully";
            }, 1000);
        })
});