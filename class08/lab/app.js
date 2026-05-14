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

function displayUser(user){
    const card = createUserCard(user);

    card.children[0].textContent = user.name;
    createUserCardBody(user, card.children[1]);

    const postBtn = card.children[2].children[0];
    postBtn.addEventListener("click", () => {
        loadUserPosts(user, card.children[2]);
    });
    return card;
}

function createUserCard(user){
    const card = document.createElement("div");
    card.className = "card mb-2 p-0";
    
    const cardHead = document.createElement("div");
    cardHead.className = "card-header fs-6 fw-medium";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const userPostsList = document.createElement("ul");
    userPostsList.className = "list-group list-group-flush";
    
    const loadPostsBtn = document.createElement("button");
    loadPostsBtn.className = "btn btn-sm btn-info";
    loadPostsBtn.id = `load-posts-user${user.id}`;
    loadPostsBtn.textContent = "load posts";
    userPostsList.appendChild(loadPostsBtn);

    card.append(cardHead, cardBody, userPostsList);
    return card;
}

function createUserCardBody(user, cardBody){
    const email = document.createElement("p");
    const phone = document.createElement("p");
    const city = document.createElement("p");
    const company = document.createElement("p");

    email.textContent = `Email: ${user.email}`;
    phone.textContent = `Phone Number: ${user.phone}`;
    city.textContent = `City: ${user.city ?? "n/a"}`;
    company.textContent = `Company Name: ${user.company.name}`;

    cardBody.append(email, phone, city, company);
    return cardBody;
}

function loadUserPosts(user, ul){
    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => {
            if (!response.ok){
                throw new Error(`HTTP ${response.status} Error`);
            }
            return response.json();
        })
        .then((posts) => {
            const userPosts = posts.filter(post => post.userId === user.id);

            displayUserPosts(userPosts, ul);
        })
        .catch((error) => {
            setTimeout(() => {
                console.log(error);
                setStatus(p, "error", error.message);
            }, 500);
        });
}

function displayUserPosts(userPosts, ul){
    for (const post of userPosts){
        const li = document.createElement("li");
        li.className = "list-group-item";

        const postTitle = document.createElement("p");
        postTitle.className = "fw-medium"
        postTitle.textContent = post.title;

        const postBody = document.createElement("p");
        postBody.textContent = post.body;

        li.append(postTitle, postBody);
        
        ul.appendChild(li);
    }
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