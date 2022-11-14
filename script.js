const studentNameField = document.getElementById("name");
const sidField = document.getElementById("id");

//Name Capitalization
function capitalizeFirstLetter(string) {
  if (string == "") {
    return string;
  } else {
    var words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }
}
//

function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateFormData(formData);
    resetFrom();
  }
}

function readFormData() {
  var formData = {};
  formData["id"] = sidField.value;
  formData["name"] = capitalizeFirstLetter(studentNameField.value);

  //   console.log(formData);
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .getElementById("stdList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.id;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = '<a onClick="onEdit(this)" class="editBTN">Edit</a>';
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = '<a onClick="onDelete(this)" class="deleteBTN">Delete</a>';
}

function resetFrom() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("submit-btn").value = "ADD";
  selectedRow = null;
}

var selectedRow = null;

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("id").value = selectedRow.cells[0].innerHTML;
  document.getElementById("name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("submit-btn").value = "EDIT";
}

function updateFormData(formData) {
  selectedRow.cells[0].innerHTML = formData.id;
  selectedRow.cells[1].innerHTML = formData.name;
}

function onDelete(td) {
  if (confirm("Are you sure? This data will be lost forever!")) {
    row = td.parentElement.parentElement;
    document.getElementById("stdList").deleteRow(row.rowIndex);
    resetFrom();
  }
}

// To upperscase
function upperCaseF(a) {
  setTimeout(function () {
    a.value = a.value.toUpperCase();
  }, 1);
}

// --------------- Validation -----------------

// ---------- Blank validation
const isRequired = (value) => (value === "" ? true : false);

// ---------- Max character validation
const isNotBetween = (length, min, max) =>
  length < min || length > max ? true : false;

// ---------- Error
const showError = (input, message) => {
  // get the input field element
  const formField = input.parentElement;

  //add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

// ---------- Success
const showSuccess = (input) => {
  // get the input field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

// ---------- Validate for letters
const nameError = (name) => {
  var letters = /^[A-Za-z\s]+$/;
  if (name.match(letters)) {
    return false;
  } else {
    return true;
  }
};

const checkStudentName = () => {
  let valid = false;
  const min = 3,
    max = 25;
  var studentName = studentNameField.value.trim();
  studentName = capitalizeFirstLetter(studentName);
  console.log(studentName);

  // Validation
  if (isRequired(studentName)) {
    showError(studentNameField, "Student Name cannot be blank.");
  } else if (nameError(studentName)) {
    showError(studentNameField, `Only Alphabets!`);
  } else if (isNotBetween(studentName.length, min, max)) {
    showError(
      studentNameField,
      `Student Name must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(studentNameField);
    valid = true;
  }
  return valid;
};

const checkSID = () => {
  let valid = false;
  var sid = sidField.value.trim();

  if (isRequired(sid)) {
    showError(sidField, "Student ID must not be blank! >_<");
  } else {
    showSuccess(sidField);
    valid = true;
  }
  return valid;
};

function validate() {
  let isStudentNameValid = checkStudentName(),
    isSIDValid = checkSID();

  let isFormValid = isStudentNameValid && isSIDValid;
  return isFormValid;
}
