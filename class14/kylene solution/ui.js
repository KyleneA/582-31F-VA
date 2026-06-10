export function tournamentStatusUi(type, statusP){
    if (type === "loading") {
        statusP.textContent = "Loading...";
        statusP.className = "fw-medium text-black";
    } else if (type === "success") {
        statusP.textContent = "Tournaments loaded successfully";
        statusP.className = "fw-medium text-capitalize text-primary";
    }
}

export function registrationStatusUi(type, statusLi){
    if (type === "loading") {
        statusLi.textContent = "Loading...";
        statusLi.className = "list-group-item fw-medium text-black";
    } else if (type === "success") {
        statusLi.textContent = "Tournaments loaded successfully";
        statusLi.className = "list-group-item fw-medium text-capitalize text-primary";
    }
}