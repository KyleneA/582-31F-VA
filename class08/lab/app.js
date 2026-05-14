function setStatus(p, type, message){
    p.textContent = message;

    if (type === "loading"){
        p.className = "text-uppercase text-primary fw-medium fs-5";
    }
    if (type === "loading-post"){
        p.className = "list-group-item text-uppercase text-primary";
    }
    if (type === "success"){
        p.className = "text-uppercase fw-medium fs-5";
    }
    if (type === "success-post"){
        p.className = "list-group-item text-uppercase bg-info-subtle d-flex justify-content-between";
    }
    if (type === "error"){
        p.className = "text-uppercase text-danger fw-medium fs-5";
    }
    if (type === "error-post"){
        p.className = "list-group-item text-uppercase bg-danger-subtle";
    }
    if (type === "clear"){
        p.className = "text-uppercase fw-medium fs-5 text-success";
    }
    if (type === "clear-post"){
        p.className = "list-group-item text-uppercase text-success";
    }
}

function loadUsers(p, cardsDiv){
    fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok){
                    throw new Error(`HTTP Error ${response.status}`);
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
    const cardHeader = card.children[0];
    const cardBody = card.children[1];
    const postList = card.children[2];

    cardHeader.textContent = user.name;
    createUserCardBody(user, cardBody);

    const postBtn = postList.children[0];
    const postStatus = postList.children[1];
    postBtn.addEventListener("click", () => {
        setStatus(postStatus, "loading-post", "Loading ...");
        postBtn.disabled = true;

        setTimeout(() => {
            loadUserPosts(user, postList, postStatus);
        }, 500);
    });

    postStatus.addEventListener("click", () => {
        if (postStatus.textContent === "ready to load posts") return;
        postList.innerHTML = "";
        postList.append(postBtn, postStatus);

        setStatus(postStatus, "clear-post", "Ready to load users");
        
        postBtn.disabled = false;
    })
    return card;
}

function createUserCard(user){
    const card = document.createElement("div");
    card.className = "card mb-2 p-0";
    
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header fs-6 fw-medium";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const userPostsList = document.createElement("ul");
    userPostsList.className = "list-group list-group-flush";
    
    const loadPostsBtn = document.createElement("button");
    loadPostsBtn.className = "btn btn-sm btn-info rounded-0";
    loadPostsBtn.id = `load-posts-user${user.id}`;
    loadPostsBtn.textContent = "load posts";
    userPostsList.appendChild(loadPostsBtn);

    const postLoadStatus = document.createElement("li");
    postLoadStatus.className = "list-group-item text-uppercase text-success";
    postLoadStatus.textContent = "ready to load posts";
    userPostsList.appendChild(postLoadStatus);

    card.append(cardHeader, cardBody, userPostsList);
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

function loadUserPosts(user, ul, postStatus){
    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => {
            if (!response.ok){
                throw new Error(`HTTP Error ${response.status}`);
            }
            return response.json();
        })
        .then((posts) => {
            const userPosts = posts.filter(post => post.userId === user.id);
            displayUserPosts(userPosts, ul);

            setStatus(postStatus, "success-post", "Posts were loaded successfully!");

            const closePosts = document.createElement("button");
            closePosts.className = "btn-close";
            closePosts.type = "button";
            postStatus.appendChild(closePosts);
        })
        .catch((error) => {
            setTimeout(() => {
                console.log(error);
                setStatus(postStatus, "error-post", error.message);
            }, 500);
        });
}

function displayUserPosts(userPosts, ul, closePosts){

    for (const post of userPosts){
        if (ul.children.length > 4) return;

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
        cardsHolder.innerHTML = "";
        loadBtn.disabled = true;

        loadUsers(statusP, cardsHolder);

        clearBtn.disabled = false;
    });

    clearBtn.addEventListener("click", () => {
        cardsHolder.innerHTML = "";

        setStatus(statusP, "clear", "Ready to load users");
        
        clearBtn.disabled = true;
    })
}

main();