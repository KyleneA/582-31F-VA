function checkPassword(password){
    const pw = "password";
    const promise = new Promise((resolve, reject) => {
        if (pw === password){
            setTimeout(() => {
                resolve("Password is correct");
            }, 2000);
        } else {
            reject("Password is incorrect");
        }
    });
    return promise;
}

checkPassword("password")
    .then((result) => {
        console.log("--- checkPassword('password')");
        console.log(result);
    })
    .catch((error) => {
        console.log("--- checkPassword('password')");
        console.log(error);
    });

checkPassword("Password")
    .then((result) => {
        console.log("--- checkPassword('Password')");
        console.log(result);
    })
    .catch((error) => {
        console.log("--- checkPassword('Password')");
        console.log(error);
    });

checkPassword("pass")
    .then((result) => {
        console.log("--- checkPassword('pass')");
        console.log(result);
    })
    .catch((error) => {
        console.log("--- checkPassword('pass')");
        console.log(error);
    });