document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable");

    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Function to render students
    function renderStudents() {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });

        localStorage.setItem("students", JSON.stringify(students)); // Save to localStorage
    }

    // Add Student
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let studentID = document.getElementById("studentID").value.trim();
        let email = document.getElementById("email").value.trim();
        let contact = document.getElementById("contact").value.trim();

        // Validations
        if (!/^[a-zA-Z ]+$/.test(name)) return alert("Invalid name!");
        if (!/^\d+$/.test(studentID)) return alert("Student ID must be numbers only!");
        if (!/^\d+$/.test(contact)) return alert("Contact number must be numbers only!");

        students.push({ name, studentID, email, contact });
        studentForm.reset();
        renderStudents();
    });

    // Edit Student
    window.editStudent = function(index) {
        let student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentID").value = student.studentID;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1); // Remove the student
        renderStudents();
    };

    // Delete Student
    window.deleteStudent = function(index) {
        if (confirm("Are you sure you want to delete this record?")) {
            students.splice(index, 1);
            renderStudents();
        }
    };

    renderStudents(); // Initial render
});
