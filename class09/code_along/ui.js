function createUserCard(user){
    const article = document.createElement("article");
    article.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;
    article.style = `
        padding: 5px 10px;
        border: 1px solid black;
        margin: 10px 0;
    `;
    return article;
}

export function renderUsers(users, container) {
    clearUsers(container);

    users.slice(0, 5).forEach((user) => {
        container.appendChild(createUserCard(user));
    });
}

export function clearUsers(container) {
    container.innerHTML = "";
}