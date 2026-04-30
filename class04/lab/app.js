const studentDiv = document.getElementById("student-data");
const studentBtn = document.getElementById("students-btn");
const courseDiv = document.getElementById("course-data");
const courseBtn = document.getElementById("courses-btn");
const clearBtn = document.getElementById("clear");

const student = {
    id: "12345",
    name: "Jon Dough",
    program: "Web Design",
    semester: "winter 2026",
    bio: "Something about John and his accomplishments as a student.",
};

function getStudentData() {
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

getStudentData();

function renderStudent(student) {
    const title = document.createElement("h2");
    const studentName = document.createElement("h3");
    const program = document.createElement("p");
    const semester = document.createElement("p");
    const bio = document.createElement("p");

    title.textContent = "Student Profile";
    studentDiv.append(title);

    studentName.textContent = student.name;
    program.textContent = `Program: ${student.program}`;
    semester.textContent = `Semester: ${student.semester}`;
    bio.textContent = `Bio: ${student.bio}`;

    studentDiv.append(studentName, program, semester, bio);
}

renderStudent(student);