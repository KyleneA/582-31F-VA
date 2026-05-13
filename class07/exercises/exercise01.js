const loadPostBtn = document.getElementById("load-btn");
const statusP = document.getElementById("status");
const postDiv = document.getElementById("post-content");

loadPostBtn.addEventListener("click", () => {
    statusP.textContent = "Loading post...";
    postDiv.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts/1")
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
                statusP.textContent = "Post was successfully loaded";
                postDiv.append(titleH2, bodyP);
            }, 1000);
        })
        .catch((error) => {
            console.log(error);
            statusP.textContent = "Post failed to load";
            postDiv.textContent = error;
        });
});