// Exercise 1
const jsonText = '{"title":"Web Interface Programming 2","credits":3,"active":true}';

const parsedJSON = JSON.parse(jsonText);

console.log("object:", parsedJSON);
console.log("title:", parsedJSON.title);
console.log("credits:", parsedJSON.credits);

// Exercise 2
const course = {
    title: "Advanced Programming",
    credits: 3,
    active: true
};

const courseJSON = JSON.stringify(course);

console.log("result:", courseJSON);
console.log("type:", typeof courseJSON);

// Exercise 3
const courseJSONReadable = JSON.stringify(course, null, 4);
console.log("Readable JSON:", courseJSONReadable);