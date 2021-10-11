/**
 * ini adalah sebuah fungsi untung menggenerate data kedalam table
 * menerima 1 parameter yaitu data mahasiswa
 */
function generateData(studentsData) {
  let tableHTML = "";

  /**
   * Select element body table yang classnya .table-body-student
   */
  const tableStudent = document.querySelector(".table-body-student");

  /**
   * Looping data mahasiswa dan generate html untuk body table
   * agar data yang ditampilkan dinamis
   */
  for (const dataIndex in studentsData) {
    tableHTML += `
      <tr>
        <td>${parseInt(dataIndex) + 1}</td>
        <td>${studentsData[dataIndex].studentID}</td>
        <td>${studentsData[dataIndex].fullname}</td>
        <td>${studentsData[dataIndex].gender}</td>
        <td>${studentsData[dataIndex].fakultas}</td>
        <td>${studentsData[dataIndex].programStudy}</td>
        <td>
          <a href="javascript:void(0)" class="btn btn-sm btn-danger btn-delete" data-studentid="${
            studentsData[dataIndex].studentID
          }">
            <i data-feather="trash-2"></i>
          </a>
        </td>
      </tr>
    `;
  }

  /**
   * Generate HTML
   */
  tableStudent.innerHTML = tableHTML;
  feather.replace();

  /**
   * Jalankan fungsi remove data
   */
  removeData(studentsData);
}

/**
 * Fungsi remove data adalah menghapus data mahasiswa
 * dari table dan menerima 1 parameter yaitu data mahasiswa
 */
function removeData(studentsData) {
  /**
   * Select semua button yang mempunyai class .btn-delete
   */
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    /**
     * Setiap button yang ditemukan
     * buat event onclick
     */
    btn.onclick = function (e) {
      /**
       * Cari index suatu data berdasarkan NIM / STUDENTID nya
       */
      const index = studentsData.findIndex(
        (data) => data.studentID === this.dataset.studentid
      );

      /**
       * Muncul konfirmasi apakah akan tetap dihapus ?
       */
      const status = confirm("Apakah data akan dihapus ?");

      /**
       * Jika iya maka hapus data berdasarkan index yang ditemukan
       * lalu generate lagi data kedalam table
       */
      if (status) {
        studentsData.splice(index, 1);
        generateData(studentsData);
        localStorage.setItem("students", JSON.stringify(studentsData));
      }
    };
  });
}
generateData(JSON.parse(localStorage.getItem("students")));

// Menampilkan form tambah data mahasiswa
// Select button untuk menampilkan form dan element form
const formBtn = document.querySelector(".show-form-btn");
const formStudent = document.querySelector(".form");
let formIsHide = true;

// Buat event click pada formBtn
formBtn.onclick = function (e) {
  // Saat di click cek dulu form ini sedang dihidden atau gak
  //kalau di hidden makan tampilkan
  // dan ganti text button tersebut jadi hide form
  // dan sebaliknya
  if (formIsHide) {
    formStudent.classList.add("show-form");
    e.target.innerText = "Hide Form";
    formIsHide = false;
  } else {
    formStudent.classList.remove("show-form");
    e.target.innerText = "Lets! Add a Student";
    formIsHide = true;
  }
};

// Select button submit, select fakultas, dan program study select
// dan ini semua data program study ke dalam object
const addBtn = document.querySelector(".add-student");
const facultySelect = document.querySelector(".faculty");
const ProgramStudySelect = document.querySelector(".programStudy");
const programStudy = [
  {
    name: "Pascasarjana",
    programStudy: [
      { name: "Magister Manajemen" },
      { name: "Magister Teologi" },
    ],
  },
  {
    name: "Fakultas Filsafat",
    programStudy: [{ name: "Ilmu Filsafat" }],
  },
  {
    name: "Fakultas Keguruan",
    programStudy: [
      { name: "Pendidikan Agama" },
      { name: "Pendidikan Bahasa Inggris" },
      { name: "Pendidikan Ekonomi" },
      { name: "Pendidikan Luar Sekolah" },
    ],
  },
  {
    name: "Fakultas Ekonomi",
    programStudy: [{ name: "Akuntansi" }, { name: "Manajemen" }],
  },
  {
    name: "Fakultas Pertanian",
    programStudy: [{ name: "Akroteknologi" }],
  },
  {
    name: "Fakultas Ilmu Komputer",
    programStudy: [{ name: "Informatika" }, { name: "Sistem Informasi" }],
  },
  {
    name: "Fakultas Keperawatan",
    programStudy: [{ name: "Profesi Ners" }, { name: "Keperawatan" }],
  },
  {
    name: "Akademi Sekretari",
    programStudy: [{ name: "Sekretari (D3)" }],
  },
];

// Ganti Value Program Study ketika Fakultas dipilih
// dengan looping data programStudy yang telah diinit diatas
// dan samakan value programstudy dengan fakultas yang diselect
// jika sudah maka generate element program study
facultySelect.onchange = function (e) {
  let optionHTML =
    "<option value=''>---Select Student Program Study---</option>";
  for (const ProgramStudyIndex in programStudy) {
    if (programStudy[ProgramStudyIndex].name === e.target.value) {
      for (const index in programStudy[ProgramStudyIndex].programStudy) {
        optionHTML += `
          <option value="${programStudy[ProgramStudyIndex].programStudy[index].name}">
          ${programStudy[ProgramStudyIndex].programStudy[index].name}
          </option>`;
      }
    }
  }
  ProgramStudySelect.innerHTML = optionHTML;
};

// Jika button tambah data di click
// maka select inputan form control
// radio gender
// select control
addBtn.onclick = function () {
  let data = {};

  const formControl = document.querySelectorAll(".form-control");
  const genderInput = document.querySelectorAll(".gender");
  const selectControl = document.querySelectorAll(".form-select");

  // ambil value inputan formControl lalu simpan data tersebut ke dalam object data
  formControl.forEach((input) => {
    data = {
      ...data,
      [input.name]: input.value,
    };
  });

  // ambil value radio gender lalu simpan data tersebut ke dalam object data
  genderInput.forEach((radio) => {
    if (radio.checked) {
      data = {
        ...data,
        gender: radio.value,
      };
    }
  });

  // ambil value inputan selectControl lalu simpan data tersebut ke dalam object data
  selectControl.forEach((select) => {
    if (select.name !== "") {
      data = {
        ...data,
        [select.name]: select.value,
      };
    }
  });

  // Cek dulu data udah ada gak sebelumnya dilocalstorage  ?

  if (localStorage.getItem("students") !== null) {
    //jika sudah ada cukup push data aja gak perlu di init
    let students = JSON.parse(localStorage.getItem("students"));
    students.push(data);
    localStorage.setItem("students", JSON.stringify(students));
  } else {
    // kalau belum ada makan init localstorage dan tambahkan
    localStorage.setItem("students", JSON.stringify([data]));
  }

  // Reset form yang mempunyai class .studentForm
  document.querySelector(".studentForm").reset();

  const studentsData = JSON.parse(localStorage.getItem("students"));
  generateData(studentsData);
};

/**
 * Filter data ketika select fakultas diubah
 * berdasarkan yang diselect oleh user
 */
document.querySelector(".faculty-filter").onchange = function (e) {
  const students = JSON.parse(localStorage.getItem("students"));
  const data = [];

  data.push(
    students.filter((data) => {
      // Return data kalau data fakultas dari mahasisswa
      // sama dengan yang di select
      return data.fakultas === e.target.value;
    })
  );

  generateData(data[0]);
};
/**
 * Filter data ketika select program study diubah
 * berdasarkan yang diselect oleh user
 */

document.querySelector(".programStudy-filter").onchange = function (e) {
  const students = JSON.parse(localStorage.getItem("students"));
  const data = [];

  data.push(
    students.filter((data) => {
      // Return data kalau data program study dari mahasisswa
      // sama dengan yang di select
      return data.programStudy === e.target.value;
    })
  );

  generateData(data[0]);
};

/**
 * Filter data ketika inputan pencarian diubah
 * berdasarkan yang diselect oleh user
 */
document.querySelector(".searchName").onkeyup = function (e) {
  const students = JSON.parse(localStorage.getItem("students"));
  const data = [];

  let regex = new RegExp(e.target.value, "g");
  data.push(
    students.filter((data) => {
      return data.fullname.match(regex);
    })
  );

  if (e.target.value.length < 1) {
    generateData(students);
  } else {
    generateData(data[0]);
  }
};
