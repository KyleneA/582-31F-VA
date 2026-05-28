console.log("----- Successful try -----");

try {
    const result = JSON.parse('{"name":"Alice"}');
    console.log(result.name);
} catch (error) {
    console.log("Something went wrong");
    console.log(error.message);
}

console.log("----- invalid JSON -----");

try {
    const result = JSON.parse("{ name: Alice }");
    console.log(result);
} catch (error) {
    console.log("JSON parsing failed");
    console.log(error.message);
}

console.log("----- Finally -----");

try {
    console.log("Trying something...");
    throw new Error("Example failure"); // without throwing the error the catch will not run
} catch (error) {  
    console.log("Caught:", error.message);
} finally {
    console.log("This always runs");
}

