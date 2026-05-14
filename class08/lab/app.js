function setStatus(p, type, message){
    if (type === "loading"){
        p.textContent = message;
        p.className = "text-uppercase text-primary fw-medium fs-5";
    }
    if (type === "success"){
        p.textContent = message;
        p.className = "text-uppercase fw-medium fs-5";
    }
    if (type === "error"){
        p.textContent = message;
        p.className = "text-uppercase text-danger fw-medium fs-5";
    }
}

function loadUsers(p, cardsDiv){
    fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok){
                    throw new Error(`HTTP ${response.status} Error`);
                }
                return response.json();
            })
            .then((users) => {
                
                setTimeout(() => {
                    for (let user = 0; user < 5; user++){
                        const userCard = displayUser(users[user]);
                        cardsDiv.append(userCard);
                    }
                    
                    setStatus(p, "success", "Users were successfully loaded!");
                }, 1500)
            })
            .catch((error) => {
                setTimeout(() => {
                    console.log(error);
                    setStatus(p, "error", error.message);
                }, 500);
            });
}


function main() {
    const loadBtn = document.getElementById('load-btn');
    const clearBtn = document.getElementById("clear-btn");
    const cardsHolder = document.getElementById("cards-holder");
    const statusP = document.getElementById("status");
    
    loadBtn.addEventListener("click", () => {
        setStatus(statusP, "loading", "loading...");

        loadUsers(statusP, cardsHolder);
    });
}

main();