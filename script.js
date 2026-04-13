let todos = JSON.parse(localStorage.getItem("todos")) || [];

tampilkanTugas();

function tampilkanTugas() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        list.innerHTML += `
        <li>
            <span id="teks-${i}">${todos[i]}</span>

            <input type="checkbox" onchange="toggleSelesai(${i}, this)">

            <button onclick="editTugas(${i})">Edit</button>
            <button onclick="hapusTugas(${i})">Hapus</button>
        </li>
        `;
    }
}

function tambahTugas() {
    let input = document.getElementById("inputTugas");
    let nilai = input.value;

    if (nilai === "") {
        alert("Tidak boleh kosong!");
        return;
    }

    todos.push(nilai);
    input.value = "";

    simpanDanRender();
}

function hapusTugas(index) {
    todos.splice(index, 1);
    simpanDanRender();
}

function hapusSemua() {
    if (confirm("Yakin ingin hapus semua tugas?!")) {
        todos = [];
        simpanDanRender();
    }
}

function editTugas(index) {
    let tugasBaru = prompt("Edit tugas:", todos[index]);

    if (tugasBaru === null || tugasBaru.trim() === "") return;

    todos[index] = tugasBaru;
    simpanDanRender();
}

function toggleSelesai(index, checkbox) {
    let teks = document.getElementById("teks-" + index);

    if (checkbox.checked) {
        teks.classList.add("selesai");
    } else {
        teks.classList.remove("selesai");
    }
}

function simpanDanRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    tampilkanTugas();
}

document.getElementById("inputTugas")
.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        tambahTugas();
    }
});