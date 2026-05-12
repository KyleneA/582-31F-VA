const loadBtn = document.querySelector(".btn.btn-info");
const statusP = document.getElementById("status");
const bodyDiv = document.getElementById("card-body");
const clearBtn = document.querySelector(".btn.btn-outline-info");

const spinner = document.createElement("div");
spinner.className = "spinner-border";
spinner.role = "status";

const spinnerSpan = document.createElement("span");
spinnerSpan.className = "visually-hidden";
spinnerSpan.textContent = "Loading...";
spinner.appendChild(spinnerSpan);


loadBtn.addEventListener("click", () => {
    statusP.textContent = "Loading...";
    statusP.className = "text-uppercase fs-5 fw-medium mb-0";
    
    statusP.parentElement.prepend(spinner);

    bodyDiv.innerHTML = "";

    const userFetch = fetch("https://jsonplaceholder.typicode.com/users/1");

    userFetch
        .then((response) => {
            if (response.ok === false) {
                throw new Error(`(${response.status})`);
            }
            console.log(response);
            return response.json();
        })
        .then ((data) => {
            const h2 = document.createElement("h2");
            const email = document.createElement("p");
            const phone = document.createElement("p");
            const city = document.createElement("p");
            const company = document.createElement("p");
            const website = document.createElement("p");
                
            h2.textContent = data.name;
            h2.className = "mb-3";
            
            email.textContent = "Email: " + (data.email ?? "N/A");
            phone.textContent = "Phone Number: " + (data.phone ?? "N/A");
            city.textContent = "City: " + (data.city ?? "N/A");
            company.textContent = "Company: " + (data.company.name ?? "N/A");
            website.textContent = "Website: " + (data.website ?? "N/A");
            
            setTimeout(() => {
                if (bodyDiv.innerHTML) return;
                bodyDiv.append(h2, email, phone, city, company, website);
                
                statusP.textContent = "User loaded successfully";
                statusP.className = "text-success text-uppercase fs-5 fw-medium  mb-0";
                spinner.remove();

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
                
                spinner.remove()

                clearBtn.disabled = false;
            }, 1000)
        });
});

clearBtn.addEventListener("click", () => {
    statusP.textContent = "clearing...";
    statusP.className = "text-primary text-uppercase fs-5 fw-medium mb-0";

    spinner.className = "spinner-border text-primary";
    statusP.parentElement.prepend(spinner);

    setTimeout(() => {
        statusP.textContent = "ready";
        statusP.className = "text-success text-uppercase fs-5 fw-medium  mb-0";
        bodyDiv.innerHTML = "";
        clearBtn.disabled = true;

        spinner.remove();
    }, 750)
});

/**
 * Reflection
 * fetch() return a Reponse object
 * response.json() parses the Response object into a JS object and allows us to use the JSON data information
 * the Response object has different attributes relating to the resolved promise from the fetch (like status & ok) while the parsed data is a usable JS object with the information requested in the fetch()
 * the page shows data is loading through the change in status text in the card header div
 * if the ok attribute from the response is false, an error is thrown and the catch handles displaying the error status messages
*/