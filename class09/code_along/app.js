import { fetchUsers } from "./api.js";
import { renderUsers, clearUsers } from "./ui.js";

const loadUsersBtn = document.getElementById("load-users-btn");
const clearBtn = document.getElementById("clear-btn");

const statusP = document.getElementById("status");
const usersDiv = document.getElementById("users-container");

loadUsersBtn.addEventListener("click", () => {
    statusP.textContent = "Loading users...";

    fetchUsers()
        .then((users) => {
            renderUsers(users, usersDiv);
            statusP.textContent = "Users loaded successfully";
        })
        .catch((error) => {
            statusP.textContent = `Failed to load users: ${error.message}`;
        })
});

clearBtn.addEventListener("click", () => {
    clearUsers(usersDiv);
});
