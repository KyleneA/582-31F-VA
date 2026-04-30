const studentDiv = document.getElementById("student-data");
const studentBtn = document.getElementById("students-btn");
const courseDiv = document.getElementById("course-data");
const courseBtn = document.getElementById("courses-btn");
const clearBtn = document.getElementById("clear");

const student1 = {
    id: "12345",
    name: "John Dough",
    program: "Web Design",
    semester: "winter 2026",
    bio: "Something about John and his accomplishments as a student.",
};

function getStudentData(student) {
    const isStudent = student.id && student.name && student.program && student.semester && student.bio;
    
    const promise = new Promise((resolve, reject) => {
        if (isStudent) {
            resolve(student);
        } else {
            reject("Load Failed.")
        }
    });
    return promise;
}

getStudentData(student1);