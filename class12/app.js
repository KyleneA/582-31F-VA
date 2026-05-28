console.log("===== Guided Build =====");

const loadPostBtn = document.getElementById("load-post-btn");
const clearPostBtn = document.getElementById("clear-post-btn");
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
                    clearPostBtn.disabled = false;
                })
                .catch((error) => {
                    statusP.textContent = `Failed to load post: ${error.message}`;
                    statusP.style = "color: crimson; font-weight: 700;";
            }).finally(() => {
                console.log("Request finished");
            });
        }
    } catch (error) {
        statusP.textContent = "Failed to load... " + error.message;
        statusP.style = "color: crimson; font-weight: 700;";
        return;
    } finally{
        console.log("Request finished");
        setTimeout(() => {
            input.value = "";
            statusP.textContent = "Click the button to load a post.";
            statusP.style = "color: black; font-weight: 400;";
            loadPostBtn.disabled = false; 
        }, 3000);
    };
});

clearPostBtn.addEventListener("click", () => {
    output.innerHTML = "";
    clearPostBtn.disabled = true;
})

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

console.log("----- Challenge Tasks -----");

try {
    const result = JSON.parse("{ name Alice }");
    console.log(result);
} catch (error) {
    console.log("JSON parsing failed");
    console.log(error.message);
}

const loadCommentBtn = document.getElementById("comments-btn");

loadCommentBtn.addEventListener("click", () => {
    statusP.textContent = "Loading comments...";
    output.innerHTML = "";
    loadCommentBtn.disabled = true;

    try{
        fetch(`https://jsonplaceholder.typicode.com/comments/1`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((comment) => {
                output.innerHTML = `
                    <h2>${comment.title}</h2>
                    <p>${comment.body}</p>
                `;
                statusP.textContent = "Comment loaded successfully.";
                clearPostBtn.disabled = false;
            })
            .catch((error) => {
                statusP.textContent = `Failed to load comment: ${error.message}`;
                statusP.style = "color: crimson; font-weight: 700;";
        }).finally(() => {
            console.log("Request finished");
        });
    } catch (error) {
        statusP.textContent = "Failed to load... " + error.message;
        statusP.style = "color: crimson; font-weight: 700;";
        return;
    } finally{
        console.log("Request finished");
        setTimeout(() => {
            input.value = "";
            statusP.textContent = "Click the button to load a comment.";
            statusP.style = "color: black; font-weight: 400;";
            loadCommentBtn.disabled = false; 
        }, 3000);
    };
})