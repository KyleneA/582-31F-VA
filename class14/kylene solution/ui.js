export function tournamentStatusUi(type, statusP){
    if (type === "loading") {
        statusP.textContent = "Loading...";
        statusP.className = "fw-medium text-black";
    } else if (type === "success") {
        statusP.textContent = "Tournaments loaded successfully";
        statusP.className = "fw-medium text-capitalize text-primary";
    }
}