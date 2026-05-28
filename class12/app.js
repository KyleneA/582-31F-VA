console.log("===== Guided Build =====");

const loadPostBtn = document.getElementById("load-post-btn");
const statusP = document.getElementById("status");
const output = document.getElementById("output");
const input = document.getElementById("post-id-input");

loadPostBtn.addEventListener("click", () => {
    statusP.textContent = "Loading post...";
    output.innerHTML = "";
    loadPostBtn.disabled = true;

    const postID = Number(input.value);
    
    try{
        if (validatePostId(postID)) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error: ${response.status}`);
                    }
                    return response.json();
                })
                .then((post) => {
                    output.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `;
                    statusP.textContent = "Post loaded successfully.";
                })
                .catch((error) => {
                    statusP.textContent = `Failed to load post: ${error.message}`;
            }).finally(() => {
                console.log("Request finished");
            });
        }
    } catch (error) {
        statusP.textContent = "Failed to load... " + error.message;
        return;
    } finally{
        console.log("Request finished");
        setTimeout(() => {
            input.value = "";
            statusP.textContent = "Click the button to load a post.";
            loadPostBtn.disabled = false; 
        }, 3000);
    };
});

function validatePostId(id){
    if (typeof id !== "number" || id <= 0){
        throw new Error("Post id must be a positive number")
    }
    else {
        return true;
    }
}

try {
    validatePostId("-1");
} catch (error) {
    console.log(error.message);
}

console.log("----- Independent Tasks -----");

