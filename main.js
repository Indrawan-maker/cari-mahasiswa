const inp = document.getElementById("inp")
const btn = document.getElementById("btn")
const p = document.getElementById("p")

let result = [];

async function fetchData(){
    const API = "https://api.ryzumi.vip/api/search/mahasiswa?query="
    const name = inp.value
    const encodedName = encodeURIComponent(name)


    if (!name.trim()) {
        p.innerHTML = "Masukkan nama untuk mencari data."
        return
    }
    p.innerHTML = "mohon tunggu data sedang diproses..."


    try {
        const getApi = await fetch(API + encodedName)
        result = await getApi.json()
        console.log(JSON.stringify(result.nim))
        
        
        if (!result || result.length === 0) {
            p.innerHTML = "data tidak ditemukan."
            return
        }

        let resultHtml = ""

        
        // menampilkan isi Api
        result.slice(0, 5).forEach((data) => {
            resultHtml += `
            <strong>Nama:</strong> ${data.nama}<br>
            <strong>NIM:</strong> ${data.nim}<br>
            <strong>Jurusan:</strong> ${data.nama_prodi}<br>
            <strong>Kampus:</strong> ${data.nama_pt}<br>
            <hr>
            `
        })

        p.innerHTML = resultHtml


        
        inp.value = ""

    } catch(error) {
        p.textContent = "Terjadi kesalahan saat mengambil data!"
    }
}

btn.addEventListener('click', fetchData)

inp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchData()
    }
})

