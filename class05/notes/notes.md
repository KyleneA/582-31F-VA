## Fetch
- Fetch is a Promise
- Requests external data over HTTP
- How JS asks servers for information
- gives us the response first & will need to parse data from response
- => when fetch succeeds, Promise resolves with a response object

### Response Object
#### Properties/Attributes
- `response.status`
	- ex: 200, 404, 502, etc.
	- 200s = success
	- 400s = not found/authorized etc
	- 500s = server error/issues
- `response.ok`
	- boolean
#### Methods
- `response.json()`

### Exercise 
```js
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
            if (response.ok === false){
                throw new Error(`HTTP error (${response.status})`);
            }

            return response.json();
        })
        .then((data) => {
            for (let i = 0; i < 5; i++){
                const li = document.createElement("li");
                li.textContent = data[i].username;
                ul.appendChild(li);
                // alternative solution
                // ul.innerHTML += `<li> ${data[i].username} </li>`;
            }

            statusP.textContent = "Users loaded successfully!"
        })
        .catch((error) => {
            // will only show for server errors
            statusP.textContent = "User load failed."
            console.log(error);
        })
});
```