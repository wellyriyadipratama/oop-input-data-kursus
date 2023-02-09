
class Kursus{
    constructor(paket, jenis, harga){
    this.paket = paket;
    this.jenis = jenis;
    this.harga = harga;
    }
}

class UI { //untuk menampilkan data ketikan btn submit di click
    simpanData(kursus){
    const list = document.getElementById('data-paket');

    const row = document.createElement('tr'); //membuat table row di dalam <tbody> namun mmbuatnya di jvscript kita cukup panggil id si tbody

        row.innerHTML = `
            <td>${kursus.paket}</td>
            <td>${kursus.jenis}</td>
            <td>${kursus.harga}</td>
            <td><a href="#" class="delete">X</a></td>
            `;

            list.appendChild(row); //agar isi yg ada di javascript dapat di munculkan ke dalam browser
    }

    deleteKursus(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

        clearFields(){
            document.getElementById('paket').value = '';
            document.getElementById('jenis').value = '';
            document.getElementById('harga').value = '';
        }
}

class paketKursus{
    static getPaket(){
        let belajar;
        if(localStorage.getItem('belajar')=== null){
            belajar = [];
        } else {
            belajar = JSON.parse(localStorage.getItem('belajar'));
        }
        return belajar;
    }
    static tampilKursus(){
        const belajar = paketKursus.getPaket();

        belajar.forEach(function(kursus){
            const ui = new UI;
            ui.simpanData(kursus);
        });
    }
    static addPaket(kursus){
        const belajar = paketKursus.getPaket();

        belajar.push(kursus); //push() merupakan fungsi yg digunakan untuk memasukan value kesebuah array dan di simpan di paling akhir / paling kanan

        localStorage.setItem('belajar', JSON.stringify(belajar));
    }

    static deleteData(harga){
        const belajar = paketKursus.getPaket();
        // console.log(belajar);
        
        // const belajar = JSON.parse(localStorage.getItem())

        belajar.forEach(function(kursus, index){
            if(kursus.harga === harga){
                belajar.splice(index, 1);
            }
        });
        localStorage.setItem('belajar', JSON.stringify(belajar));
    }
}

document.addEventListener('DOMContentLoaded', paketKursus.tampilKursus);
document.getElementById('paket-kursus').addEventListener('submit', function(e){
    const paket = document.getElementById('paket').value,
          jenis = document.getElementById('jenis').value,
          harga = document.getElementById('harga').value


    const kursus = new Kursus(paket, jenis, harga);

    const ui = new UI();

    if (paket === '' || jenis === '' || harga === ''){
        alert('mohon isi data terlebih dahulu');
    } else {
            ui.simpanData(kursus);
            alert('terimakasih data berhasil disimpan !')
            paketKursus.addPaket(kursus);
            ui.clearFields();
    }

    e.preventDefault(); //mencegah terjadinya reload dom bawaan si jvscript
});

document.getElementById('data-paket').addEventListener('click', function(e){
    const ui = new UI();

    ui.deleteKursus(e.target);
    // console.log('muncul');

    // console.log(e.target.parentElement);
    
    
    paketKursus.deleteData(e.target.parentElement.previousElementSibling.textContent);
    alert('data telah terdelete !')
    // if(confirm('apakah anda yakin ingin hapus datanya !')){
    //     paketKursus.deleteData(e.target.parentElement.previousElementSibling.textContent);
    // }else {
    //     return null
    // }
    e.preventDefault();
});