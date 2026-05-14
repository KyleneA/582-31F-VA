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

function displayUser(user) {
    const card = createUserCard();

    card.children[0].textContent = user.name;
    createUserCardBody(user, card.children[1]);

    return card;
}

function createUserCard(){
    const card = document.createElement("div");
    card.className = "card mb-2 p-0";
    
    const cardHead = document.createElement("div");
    cardHead.className = "card-header fs-6 fw-medium";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const userPosts = document.createElement("ul");
    userPosts.className = "list-group list-group-flush";
    
    const loadPostsBtn = document.createElement("button");
    loadPostsBtn.className = "btn btn-sm btn-info";
    loadPostsBtn.id = "load-posts";
    loadPostsBtn.textContent = "load posts";
    userPosts.appendChild(loadPostsBtn);

    card.append(cardHead, cardBody, userPosts);
    return card;
}

function createUserCardBody(user, body){
    const email = document.createElement("p");
    const phone = document.createElement("p");
    const city = document.createElement("p");
    const company = document.createElement("p");

    email.textContent = `Email: ${user.email}`;
    phone.textContent = `Phone Number: ${user.phone}`;
    city.textContent = `City: ${user.city ?? "n/a"}`;
    company.textContent = `Company Name: ${user.company.name}`;

    body.append(email, phone, city, company);
    return body;
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