const loadBtn = document.querySelector(".btn.btn-info");
const statusP = document.getElementById("status");
const bodyDiv = document.getElementById("card-body");
const clearBtn = document.querySelector(".btn.btn-outline-info");

loadBtn.addEventListener("click", () => {
    statusP.textContent = "Loading...";
    statusP.className = "text-uppercase fs-5 fw-medium mb-0";
    bodyDiv.innerHTML = "";

    const h2 = document.createElement("h2");
    const email = document.createElement("p");
    const phone = document.createElement("p");
    const city = document.createElement("p");

    const userFetch = fetch("https://jsonplaceholder.typicode.com/users/1");

    userFetch
        .then((response) => {
            console.log(response);
            if (response.ok === false) {
                throw new Error(`(${response.status})`);
            }

            return response.json();
        })
        .then ((data) => {
            h2.textContent = data.name;
            h2.className = "mb-3";
            
            email.textContent = "Email: " + (data.email ?? "N/A");
            phone.textContent = "Phone Number: " + (data.phone ?? "N/A");
            city.textContent = "City: " + (data.city ?? "N/A");

            setTimeout(() => {
                if (bodyDiv.innerHTML) return;
                bodyDiv.append(h2, email, phone, city);
                
                statusP.textContent = "User loaded successfully";
                statusP.className = "text-success text-uppercase fs-5 fw-medium  mb-0";

                clearBtn.disabled = false;
            }, 2000);
        })
        .catch((error) => {
            console.log(error);
            const errorAlert = document.createElement("div");
            errorAlert.className = "fs-5 alert alert-danger";
            errorAlert.textContent = error;
            
            setTimeout(() => {
                if (bodyDiv.innerHTML) return;
                bodyDiv.appendChild(errorAlert);

                statusP.textContent = "Failed to load user";
                statusP.className = "text-danger text-uppercase fs-5 fw-medium mb-0";

                clearBtn.disabled = false;
            }, 1000)
        });
});

clearBtn.addEventListener("click", () => {
    statusP.textContent = "clearing...";
    statusP.className = "text-primary text-uppercase fs-5 fw-medium mb-0";

    setTimeout(() => {
        statusP.textContent = "ready";
        statusP.className = "text-success text-uppercase fs-5 fw-medium  mb-0";
        bodyDiv.innerHTML = "";
        clearBtn.disabled = true;
    }, 750)
});
