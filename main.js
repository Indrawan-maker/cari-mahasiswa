const inp = document.getElementById("inp");
const btn = document.getElementById("btn");
const p = document.getElementById("p");

let result = [];

async function fetchData() {
    const API = "https://api.ryzumi.vip/api/search/mahasiswa?query=";
    const name = inp.value;
    const encodedName = encodeURIComponent(name);

    if (!name.trim()) {
        p.innerHTML = "Masukkan nama atau NIM untuk mencari data.";
        return;
    }

    p.innerHTML = "Mohon tunggu, data sedang diproses...";

    try {
        const response = await fetch(API + encodedName);
        result = await response.json();

        console.log("Data dari API:", result);

        if (!Array.isArray(result) || result.length === 0) {
            p.innerHTML = "Data tidak ditemukan.";
            return;
        }

        let resultHtml = "";

        result.slice(0, 5).forEach((data) => {
            resultHtml += `
                <strong>Nama:</strong> ${data.nama}<br>
                <strong>NIM:</strong> ${data.nim}<br>
                <strong>Jurusan:</strong> ${data.nama_prodi}<br>
                <strong>Kampus:</strong> ${data.nama_pt}<br>
                <hr>
            `;
        });

        p.innerHTML = resultHtml;
        inp.value = "";

    } catch (error) {
        console.error("Terjadi error:", error);
        p.textContent = "server sedang rusak silahkan datang 2 bulan lagi!";
    }
}

btn.addEventListener('click', fetchData);
inp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
});
