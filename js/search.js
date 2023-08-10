const search_result_form = document.getElementById("search_result_form");
const sheet = document.querySelector(".student-result-sheet");

search_result_form.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const getOldStudents = getDataLS("students");

  const studentResult = getOldStudents.find(
    (item) => item.roll === data.roll && item.reg === data.reg
  );
  let content;

  if (studentResult) {
    content = ` <div class="student info">
    <img
      src="${studentResult.photo}"
      alt=""
      class="shadow"
      id="image-profile"
    />
    <h3>Name: ${studentResult.name}</h3>
    <h5>Roll: ${studentResult.roll}</h5>
    <h5>Reg: ${studentResult.reg}</h5>

    ${
      getFinalResult({
        bangla: studentResult.result.bangla,
        english: studentResult.result.english,
        math: studentResult.result.math,
        science: studentResult.result.science,
        social_science: studentResult.result.social_science,
        religion: studentResult.result.religion,
      }).result === "F"
        ? "<img src='https://media.istockphoto.com/id/479914266/vector/fail.jpg?s=1024x1024&w=is&k=20&c=fDdDHm4IchlX5fT7HuvC7tggCdR4kg5ThvRrTviiCLk=' id='pass-profile' class='shadow' />"
        : "<img src='https://st2.depositphotos.com/1031343/8556/v/950/depositphotos_85563074-stock-illustration-passed-stamp.jpg' id='pass-profile' class='shadow' />"
    }

    <table
      class="table table-hover table-striped table-bordered border-warning"
    >
      <tr>
        <td>#</td>
        <td>Subject</td>
        <td>Marks</td>
        <td>GPA</td>
        <td>Grade</td>
        <td>CGPA</td>
        <td>Final Result</td>
      </tr>
      <tr>
        <td>1</td>
        <td>Bangla</td>
        <td>${studentResult.result.bangla}</td>
        <td>5.00</td>
        <td>A+</td>
        <td rowspan="6">${getFinalResult({
          bangla: studentResult.result.bangla,
          english: studentResult.result.english,
          math: studentResult.result.math,
          science: studentResult.result.science,
          social_science: studentResult.result.social_science,
          religion: studentResult.result.religion,
        }).cgpa.toFixed(2)}</td>
        <td rowspan="6">${
          getFinalResult({
            bangla: studentResult.result.bangla,
            english: studentResult.result.english,
            math: studentResult.result.math,
            science: studentResult.result.science,
            social_science: studentResult.result.social_science,
            religion: studentResult.result.religion,
          }).result
        }</td>
      </tr>
      <tr>
        <td>2</td>
        <td>English</td>
        <td>${studentResult.result.english}</td>
        <td>5.00</td>
        <td>A+</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Math</td>
        <td>${studentResult.result.math}</td>
        <td>5.00</td>
        <td>A+</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Science</td>
        <td>${studentResult.result.science}</td>
        <td>5.00</td>
        <td>A+</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Social Science</td>
        <td>${studentResult.result.social_science}</td>
        <td>5.00</td>
        <td>A+</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Religion</td>
        <td>${studentResult.result.religion}</td>
        <td>5.00</td>
        <td>A+</td>
      </tr>
    </table>
  </div>`;
  } else {
    content = "Student No Results Found";
  }

  sheet.innerHTML = content;
};
