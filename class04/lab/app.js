const statusP = document.getElementById("status");
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
            setTimeout(() => {
                resolve(student);
            }, 1000);
        } else {
            setTimeout(() => {
                reject("Load Failed.")
            }, 1000);
        }
    });
    return promise;
}

function renderStudent(student) {
    const oldDivTitle = document.querySelector("#student-data h2");
    if (oldDivTitle) return;

    const title = document.createElement("h2");
    const studentName = document.createElement("h3");
    const program = document.createElement("p");
    program.className = "program";
    const semester = document.createElement("p");
    semester.className = "semester";
    const bio = document.createElement("p");
    bio.className = "bio"

    title.textContent = "Student Profile";
    studentDiv.append(title);

    studentName.textContent = student.name;
    program.textContent = `Program: ${student.program}`;
    semester.textContent = `Semester: ${student.semester}`;
    bio.textContent = `Bio: ${student.bio}`;

    studentDiv.append(studentName, program, semester, bio);
}

function clearStudentDiv() {
    const title = document.querySelector("#student-data h2");
    const studentName = document.querySelector("#student-data h3");
    const program = document.querySelector("#student-data .program");
    const semester = document.querySelector("#student-data .semester");
    const bio = document.querySelector("#student-data .bio");
    const errorP = document.querySelector("#student-data .error");
    
    const hasProfileData = title && studentName && program && semester && bio;
    
    if (hasProfileData){
        studentDiv.removeChild(title);
        studentDiv.removeChild(studentName);
        studentDiv.removeChild(program);
        studentDiv.removeChild(semester);
        studentDiv.removeChild(bio);
    }

    if (errorP) studentDiv.remove(errorP);
}

studentBtn.addEventListener("click", () => {
    statusP.textContent = "Loading student profile...";

    clearStudentDiv();

    getStudentData()
        .then((result) => {
            renderStudent(result);
        })
        .catch((error) => {
            const errorP = document.createElement("p");
            errorP.className = "error";
            studentDiv.append(errorP);
            errorP.textContent = error;
        });
    
    setTimeout(() => {
        statusP.textContent = "Ready";
    }, 1000);
})

const courses = [
    { code: "WIP2", title: "Web Interface Programming 2" },
    { code: "AWP", title: "Advanced Programming" },
    { code: "DB2", title: "Database Management Systems 2" }
];

function areCourses(courses) {
    const areCourses = [];

    for (course of courses) {
        const isCourse = course.code && course.title;
        areCourses.push(isCourse);
    }

    if (areCourses.includes(undefined)) return false;
    return true;
}

function getCourseData() {
    const promise = new Promise((resolve, reject) => {
        if (areCourses(courses)){
            setTimeout(() => {
                resolve(courses);
            }, 1000);
        } else {
            setTimeout(() => {
                reject("Load Failed.");
            }, 1000);
        }
    })
    return promise;
}

function renderCourses(courses) {
    const oldDivUl = document.querySelector("div#course-data ul");
    if (oldDivUl) return;

    const divTitle = document.createElement("h2");
    const divUl = document.createElement("ul");
    divTitle.textContent = "Courses";
    courseDiv.append(divTitle, divUl);

    for (course of courses) {
        const divLi = document.createElement("li");
        divLi.textContent = `${course.code}: ${course.title}`;
        divUl.append(divLi);
    }
}

function clearCourseDiv() {
    const divTitle = document.querySelector("div#course-data h2");
    const divUl = document.querySelector("div#course-data ul");
    const divP = document.querySelector("div#course-data p");

    if (divTitle && divUl){
        courseDiv.removeChild(divTitle);
        courseDiv.removeChild(divUl);
    }

    if (divP) courseDiv.removeChild(divP);
}

courseBtn.addEventListener("click", () => {
    statusP.textContent = "Loading courses...";

    clearCourseDiv();

    getCourseData()
        .then((result) => {
            renderCourses(result);
        })
        .catch((error) => {
            const errorP = document.createElement("p");
            courseDiv.append(errorP);
            errorP.textContent = error;
        });
    
    setTimeout(() => {
        statusP.textContent = "Ready";
    }, 1000);
});

clearBtn.addEventListener("click", () => {
    
    clearCourseDiv();
    clearStudentDiv();

    statusP.textContent = "Ready";
})