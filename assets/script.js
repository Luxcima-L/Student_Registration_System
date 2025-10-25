const selectedRow = null;

function onFormSubmit() {
    const formData = readFormData();
    if(selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}

function readFormData() {
    const formData = {};
    formData["studentName"] = document.getElementById("studentName").value;
    formData["studentID"] = document.getElementById("studentID").value;
    formData["emailID"] = document.getElementById("emailID").value;
    formData["phone"] = document.getElementById("phone").value;
    return formData;
}

function insertNewRecord(data) {
    const table = document.getElementById("studentsList").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.studentName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.studentID;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.emailID;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.phone;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a href="#" class = "btn btn-edit" onclick="onEdit(this)">Edit</a>
                        <a href="#" class = "btn btn-delete" onclick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("studentName").value="";
    document.getElementById("studentID").value="";
    document.getElementById("emailID").value="";
    document.getElementById("phone").value="";
    selectedRow = null;
}

function onEdit(td) {
    const selectedRow = td.parentElement.parentElement;
    document.getElementById("studentName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentID").value = selectedRow.cells[1].innerHTML;
    document.getElementById("emailID").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[3].innerHTML;
    // deleteRow(td);
}

function updateRecord() {
    selectedRow.cells[0].innerHTML = formData.studentName;
    selectedRow.cells[1].innerHTML = formData.studentID;
    selectedRow.cells[2].innerHTML = formData.emailID;
    selectedRow.cells[3].innerHTML = formData.phone;
}

function onDelete(td) {
    if(confirm('Are you sure to delete this record')) {
    deleteRow(td);
    resetForm();
    }
}

function deleteRow(td) {
    row = td.parentElement.parentElement;
    document.getElementById("studentsList").deleteRow(row.rowIndex);
}

// Form Validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('studentForm');
  const tableBody = document.querySelector('#studentsList tbody');



    // get values
    let nameEl = document.getElementById("studentName");
    let idEl= document.getElementById("studentID");
    let emailEl = document.getElementById("emailID");
    let phoneEl= document.getElementById("phone");

    // get error elements
    let nameError = document.getElementById("nameError");
    let idError = document.getElementById("idError");
    let emailError = document.getElementById("emailError");
    let phoneError = document.getElementById("phoneError");

    // clear old errors
    function clearErrors() {
    nameError.textContent = "";
    idError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    }
    //
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let editIndex = -1;
    renderTable();
  

    form.addEventListener('submit', (e) => {
    e.preventDefault();              
    clearErrors();

    // validation flag
    let isValid = true;

    const name = nameEl.value.trim();
    const id = idEl.value.trim();
    const email = emailEl.value.trim();
    const phone = phoneEl.value.trim();

    // name validation
    if(!name){
        nameError.textContent = "Name is required";
        isValid = false;
    } else if(!/^[A-Za-z][A-Za-z\s.]{1,39}$/.test(name)) {
        nameError.textContent ="Only letters and spaces allowed";
        isValid = false;
    }

    // ID validation
    if(!id){
        idError.textContent = "ID is required";
        isValid = false;
    } else if(!/^[0-9]+$/.test(id)) {
        idError.textContent = "ID must contain only numbers";
        isValid = false;
    }

    // email validation
    if(!email){
        emailError.textContent = "Email is required";
        isValid = false;
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Enter a valid email address";
        isValid = false;
    }

    // phone validation
    if(!phone){
        phoneError.textContent = "Contact number is required";
        isValid = false;
    } else if(!/^[0-9]\d{9}$/.test(phone)) {
        phoneError.textContent = "Enter a valid 10 digit number";
        isValid = false;
    }

    if(!isValid) return;
    //
    const newStudent = { name, id, email, phone };
    if (editIndex !== -1) {
          students[editIndex] = newStudent;
          editIndex = -1;
    } else {
    students.push(newStudent);
    }
   
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
    form.reset();

    // onFormSubmit();

    // alert("Form submitted successfully!");
    
});

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
          <button class="btn btn-edit" onclick="editStudent(${index})">Edit</button>
          <button class="btn btn-delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

   window.deleteStudent = function(index) {
    if (confirm("Are you sure you want to delete this record?")) {
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderTable();
    }
  };

  window.editStudent = function(index) {
    const student = students[index];
    nameEl.value = student.name;
    idEl.value = student.id;
    emailEl.value = student.email;
    phoneEl.value = student.phone;

    editIndex = index;
  };

});

