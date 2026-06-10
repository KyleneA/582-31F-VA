export function tournamentStatusUi(type, statusP){
    if (type === "loading") {
        statusP.textContent = "Loading...";
        statusP.className = "fw-medium text-black";
    } else if (type === "success") {
        statusP.textContent = "Tournaments loaded successfully";
        statusP.className = "fw-medium text-capitalize text-primary";
    } else if (type === "error") {
        statusP.textContent = "Tournaments failed to load.";
        statusP.className = "list-group-item fw-medium text-uppercase text-danger";
    }
}

export function registrationStatusUi(type, statusLi){
    if (type === "loading") {
        statusLi.textContent = "Loading...";
        statusLi.className = "list-group-item fw-medium text-black text-center";
    } else if (type === "success") {
        statusLi.textContent = "Registrations loaded successfully";
        statusLi.className = "list-group-item fw-medium text-capitalize text-primary text-center";
    } else if (type === "error") {
        statusLi.textContent = "Registrations failed to load.";
        statusLi.className = "list-group-item fw-medium text-uppercase text-danger text-center";
    }
}