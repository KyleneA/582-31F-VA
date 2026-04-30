let student = {
    id: "123456",
    name: "Nora",
    role: "Student",
};

console.log(student);

let auth = true;

// here we fake an API response!
function loadUserData() {
    let promise = new Promise((resolve, reject) => {
        if (auth == true) {
            resolve(student);
        } else {
            reject("Authentication Failed");
        }
    });
    return promise;
}

loadUserData()
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });

Promise.resolve(5)
	.then((result) => {
        console.log(`Part 1: ${result}`); // => prints 5
		return result * 2;
	})
	.then((result) => {
		console.log(`Part 2: ${result}`); // => prints 10
        return result * 10;
	})
    .then((result) => {
        console.log(`Part 3: ${result}`) // => prints 100
    });

    // Let's try with our student
const output = document.getElementById("output");
loadUserData()
    .then((user) => {
        console.log(`username: ${user.name}`);
        return user.name;
    })
    .then((name) => {
        return name.toUpperCase();
    })
    .then((name) => {
        console.log(name);
        output.textContent = `Hello, ${name}!`;
    })
    .catch((error) => {
        output.textContent = "Authentication Failed"
    });