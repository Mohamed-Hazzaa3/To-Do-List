let title = document.getElementById("title");
let hours = document.getElementById("hours");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//create product
let dataPro;
if (localStorage.course != null) {
  dataPro = JSON.parse(localStorage.course);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    hours: hours.value,
    date: new Date().toLocaleDateString(),
  };
  if (title.value != "" && hours.value != "") {
    if (mood === "create") {
      dataPro.push(newPro);
    } else {
      dataPro[tmp] = newPro;
      showData();
      clearInputs();
      localStorage.setItem("course", JSON.stringify(dataPro));
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  }

  //save localstorage
  localStorage.setItem("course", JSON.stringify(dataPro));

  showData();
  clearInputs();
};
//clear inputs
function clearInputs() {
  title.value = "";
  hours.value = "";
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
       <td>${i + 1}</td>
       <td>${dataPro[i].title}</td>
       <td>${dataPro[i].hours}</td>
       <td>${dataPro[i].date}</td>
       <td><button onclick="ubdateData(${i})" id="ubdate">ubdate</button></td>
       <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick = "deleteAll()">delete All</button>
    `;
  } else {
    btnDelete.innerHTML = ` `;
  }
}
showData();
//ubdate
function ubdateData(i) {
  title.value = dataPro[i].title;
  hours.value = dataPro[i].hours;
  submit.innerHTML = "Update";
  mood = "ubdate";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.course = JSON.stringify(dataPro);
  showData();
}
function deleteAll() {
  dataPro.splice(0);
  localStorage.clear();
  showData();
}
//clean data
