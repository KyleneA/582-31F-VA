const firstName = "Jane";
const lastName = "Dough";

function getFullName(fn, ln){
    // not important here if using let or const
    const fullName = `${fn} ${ln}`;

    return fullName;
}

const fullName = getFullName(firstName, lastName);

function greetUser(fullName){
    const msg = `Greetings, ${fullName}!`;
    console.log(msg);
    return msg;
}


const h1 = document.createElement("h1");
h1.textContent = greetUser(fullName);

document.body.append(h1);