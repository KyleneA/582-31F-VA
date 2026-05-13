const loadPostBtn = document.getElementById("load-btn");
const statusP = document.getElementById("status");
const postDiv = document.getElementById("post-content");

loadPostBtn.addEventListener("click", () => {
    statusP.textContent = "Loading post...";
    statusP.style.color = "blue";

    fetch("https://jsonplaceholder.typicode.com/posts/6")
        .then((response) => {
            if (!response.ok){
                throw new Error(`HTTP ${response.status} Error`);
            }

            return response.json();
        })
        .then ((post) => {
            console.log(post);
            const titleH2 = document.createElement("h2");
            titleH2.textContent = post.title;
            titleH2.className = "post-title";
            
            const bodyP = document.createElement("p");
            bodyP.textContent = post.body;

            setTimeout(() => {
                postDiv.innerHTML = "";
                statusP.textContent = "Post was successfully loaded";
                statusP.style.color = "darkgreen";
                postDiv.append(titleH2, bodyP);
            }, 1000);
        })
        .catch((error) => {
            console.log(error + 2);
            statusP.textContent = "Post failed to load";
            statusP.style.color = "crimson";
            postDiv.textContent = error;
        });
});