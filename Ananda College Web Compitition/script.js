// Check if a theme preference is stored in localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Load theme preference from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    document.getElementById('themeToggle').querySelector('i').classList.add('fa-sun');
  }
  loadStudentData();
});

// Theme Toggle functionality
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
  
  // Store the theme preference in localStorage
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Student Form Functionality
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const grade = document.getElementById('grade').value;
  const activities = document.getElementById('activities').value;

  // Create student object
  const student = { name, grade, activities };

  // Add to localStorage
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  // Add new row to the table
  addStudentRow(student);

  // Clear the form
  studentForm.reset();
});

// Function to add student data as a row in the table
function addStudentRow(student) {
  const row = studentTable.insertRow();
  row.innerHTML = `
    <td>${student.name}</td>
    <td>${student.grade}</td>
    <td>${student.activities}</td>
    <td>
      <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </td>
  `;

  // Add delete functionality
  row.querySelector('.delete-btn').addEventListener('click', () => {
    deleteStudent(row, student);
  });
}

// Function to delete student data
function deleteStudent(row, student) {
  // Remove from the table
  studentTable.deleteRow(row.rowIndex - 1);

  // Update localStorage to reflect the deleted student
  let students = JSON.parse(localStorage.getItem('students')) || [];
  students = students.filter(s => s.name !== student.name || s.grade !== student.grade || s.activities !== student.activities);
  localStorage.setItem('students', JSON.stringify(students));
}

// Function to load stored students when the page loads
function loadStudentData() {
  const students = JSON.parse(localStorage.getItem('students')) || [];
  students.forEach(student => {
    addStudentRow(student);
  });
}