const student_create_form = document.getElementById("student_create_form");
const student_edit_form = document.getElementById("student_edit_form");
const student_result_form = document.getElementById("student_result_form");
const student_edit_result_form = document.getElementById(
  "student_edit_result_form"
);
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const msgResult = document.querySelector(".msg-result");
const msgEditResult = document.querySelector(".msg-edit-result");
const studentList = document.querySelector(".all-student-data");
const singleStudentData = document.querySelector(".show-single-student-data");

//Get  Show All students data
const getStudents = () => {
  const students = getDataLS("students");
  console.log(students);

  let content = "";

  if (students.length > 0) {
    students.reverse().map((student, index) => {
      content += ` <tr>
      <th scope="row">${index + 1}</th>
      <td>
        <img src="${student.photo}" alt="Images" />
      </td>
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.reg}</td>
      <td>${timeAgo(student.createAt)}</td>
      
      <td>
      ${
        student.result === null
          ? `<button type="button" class="btn btn-success" data-bs-toggle="modal"data-bs-target="#student_result_modal" onclick="addResult('${student.id}')" >Add Result</button>`
          : `<button type="button" class="btn btn-info" data-bs-toggle="modal"data-bs-target="#student_edit_result_modal" onclick="editResultView('${student.id}')">View Marks</button>`
      }        
      </td>
      <td>
        <button type="button" class="btn btn-info" data-bs-toggle="modal"
        data-bs-target="#single_student_data_modal" onclick="singleStudent('${
          student.roll
        }')">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button type="button" class="btn btn-warning" data-bs-toggle="modal"
        data-bs-target="#edit_student_modal" onclick="editStudent('${
          student.id
        }')">
          <i class="fa-solid fa-edit"></i>
        </button>
        <button type="button" class="btn btn-danger" onclick="deleteStudent('${
          student.roll
        }')">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>`;
    });
  } else {
    content = `<tr>
      <td colspan=8>No Data Found</td>
    </tr>`;
  }

  studentList.innerHTML = content;
};
getStudents();

// Add Result Function
const addResult = (id) => {
  student_result_form.querySelector('input[name="id"]').value = id;
};

// Student Add Result Button Form Submitted Function
student_result_form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const getOldStudentsResult = getDataLS("students");
  getOldStudentsResult[
    getOldStudentsResult.findIndex((item) => item.id === data.id)
  ] = {
    ...getOldStudentsResult[
      getOldStudentsResult.findIndex((item) => item.id === data.id)
    ],
    result: data,
  };

  sendDataLS("students", getOldStudentsResult);
  getStudents();
  e.target.reset();
  msgResult.innerHTML = createAlert(`Result Update successfully`, "success");
};

// Edit Student data
const editStudent = (id) => {
  const allEditStudents = getDataLS("students");
  const editData = allEditStudents.find((item) => item.id === id);

  student_edit_form.querySelector('input[name="name"]').value = editData.name;
  student_edit_form.querySelector('input[name="roll"]').value = editData.roll;
  student_edit_form.querySelector('input[name="reg"]').value = editData.reg;
  student_edit_form.querySelector('input[name="id"]').value = editData.id;
  student_edit_form.querySelector('input[name="photo"]').value = editData.photo;
  student_edit_form
    .querySelector("img#prevPho")
    .setAttribute("src", editData.photo);
};

// Edit Student Form Submitted
student_edit_form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const getOldStudents = getDataLS("students");

  // Check Roll Number
  if (getOldStudents.some((item) => item.roll === data.roll)) {
    msgEdit.innerHTML = createAlert("Roll number Already Exists");
    return;
  }

  // Check Reg Number
  if (getOldStudents.some((item) => item.reg === data.reg)) {
    msgEdit.innerHTML = createAlert("Reg number Already Exists");
    return;
  }

  getOldStudents[getOldStudents.findIndex((item) => item.id === data.id)] = {
    ...getOldStudents[getOldStudents.findIndex((item) => item.id === data.id)],
    ...data,
  };

  sendDataLS("students", getOldStudents);
  getStudents();
  e.target.reset();
  msgEdit.innerHTML = createAlert(`${data.name} Edit successfully`, "success");
};

//View Marks Form Submission
student_edit_result_form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  let oldViewData = getDataLS("students");
  oldViewData[oldViewData.findIndex((item) => item.id === data.id)] = {
    ...oldViewData[oldViewData.findIndex((item) => item.id === data.id)],
    result: data,
  };
  sendDataLS("students", oldViewData);
  getStudents();
};
//View Marks Buttons Function
const editResultView = (id) => {
  const allStudentsMarks = getDataLS("students");
  const editAllStudentResult = allStudentsMarks.find((item) => item.id === id);

  student_edit_result_form.querySelector('input[name="bangla"]').value =
    editAllStudentResult.result.bangla;
  student_edit_result_form.querySelector('input[name="english"]').value =
    editAllStudentResult.result.english;
  student_edit_result_form.querySelector('input[name="math"]').value =
    editAllStudentResult.result.math;
  student_edit_result_form.querySelector('input[name="science"]').value =
    editAllStudentResult.result.science;
  student_edit_result_form.querySelector('input[name="social_science"]').value =
    editAllStudentResult.result.social_science;
  student_edit_result_form.querySelector('input[name="religion"]').value =
    editAllStudentResult.result.religion;
  student_edit_result_form.querySelector('input[name="id"]').value = id;
};

// View Single Student Data
const singleStudent = (id) => {
  const allStudents = getDataLS("students");
  const singleData = allStudents.find((item) => item.roll === id);

  singleStudentData.innerHTML = `
  <img src="${singleData.photo}" alt="" class="images"/>
    <h2 class="tag">Name: ${singleData.name}</h2>
    <p class="tag">Roll: ${singleData.roll}</p>
    <p class="tag">Reg: ${singleData.reg}</p>`;
};

// Delete Functions student data

const deleteStudent = (rolls) => {
  const conf = confirm("Are you sure you want to delete");

  if (conf) {
    const oldStudents = getDataLS("students");
    const updateStudent = oldStudents.filter((item) => item.roll !== rolls);
    sendDataLS("students", updateStudent);
    getStudents();
  } else {
    alert("You Are Safe ");
  }
};

// form submission Student create form

student_create_form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // form validation

  if (!data.name || !data.roll || !data.reg) {
    msg.innerHTML = createAlert("Please select fill up all fields");
  } else if (!isNumber(data.roll)) {
    msg.innerHTML = createAlert("Invalid roll number");
  } else if (!isNumber(data.reg)) {
    msg.innerHTML = createAlert("Invalid reg number");
  } else {
    const oldStudents = getDataLS("students");
    // Check Roll Number
    if (oldStudents.some((item) => item.roll === data.roll)) {
      msg.innerHTML = createAlert("Roll number Already Exists");
      return;
    }

    // Check Reg Number
    if (oldStudents.some((item) => item.reg === data.reg)) {
      msg.innerHTML = createAlert("Reg number Already Exists");
      return;
    }

    oldStudents.push({
      ...data,
      result: null,
      createAt: Date.now(),
      id: getRandomId(30),
    });
    sendDataLS("students", oldStudents);
    e.target.reset();
    msg.innerHTML = createAlert(`${data.name} Created successfully`, "success");
    getStudents();
  }
};
