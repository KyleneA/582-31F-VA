const firstName = "Jane";
const lastName = "Dough";

function getFullName(fn, ln){
    return `${fn} ${ln}`;
}

const fullName = getFullName(firstName, lastName);

function greetUser(fullName){
    console.log(`Greetings, ${fullName}!`);
}

greetUser(fullName);