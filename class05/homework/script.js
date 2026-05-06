const btn = document.querySelector("button");
const statusP = document.getElementById("status");
const outputDiv = document.getElementById("output");

btn.addEventListener("click", () => {
    statusP.textContent = "Loading post...";
    statusP.className = "text-uppercase my-4 fw-semibold";
    outputDiv.innerHTML = "";
    
    const fetchPost = fetch("https://jsonplaceholder.typicode.com/posts/5");

    fetchPost
        .then((response) => {
            if (response.ok === false){
                throw new Error(`HTTP error (${response.status})`);
            }

            return response.json();
        })
        .then((data) => {
            const title = document.createElement("p");
            title.className = "text-capitalize fs-3 mb-1";
            title.textContent = data.title;
            const body = document.createElement("p");
            body.textContent = data.body;
            setTimeout(() => {
                if (outputDiv.innerHTML !== "") return;
                outputDiv.append(title, body);
                statusP.textContent = "Post loaded successfully!";
                statusP.className ="text-uppercase my-4 fw-semibold text-success";
            }, 2000);
        })
        .catch((error) => {
            setTimeout(() => {
                statusP.textContent = "Post load failed.";
                statusP.className = "text-uppercase my-4 fw-semibold text-danger";
                console.log(error);
            }, 1000);
        })
});