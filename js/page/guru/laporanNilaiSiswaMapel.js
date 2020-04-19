define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a, b) {
      helper.loader('show')
      await helper.template('html/siswa/pilih-guru.html');

      $('body #text-content').text(`Data nilai siswa untuk soal ${b.replace(/\_/g, ' ')}`);

      helper.sesiNew('kelas', a);

      let guru = helper.decryptG(helper.sesiGet('glearn-guru'));

      let dataIsiSoal = [];

      let dataSoal = await firebase.database().ref(`guru/soal/${a}/${b}/${guru.username}/`).once('value').then((value) => {
        let dataS = value.val();
        if (Array.isArray(dataS)) {
          dataS.forEach((item, i) => {
            dataIsiSoal.push(item);
          });
        }else{
          let keys = Object.keys(dataS);
          keys.forEach((item, i) => {
            dataIsiSoal.push(dataS[item]);
          });

        }
      })

      helper.sesiNew('soalData', helper.encryptG(dataIsiSoal));


      let dataNialiSiswa = {};

      let data = await firebase.database().ref(`guru/jawaban/${guru.username}/${a}/${b}`).once('value').then((value) => {
        let data = value.val();
        let dataKelas = Object.keys(data);

        html = ``;
        console.log(b);


        dataKelas.forEach((item, i) => {
          let dataNilai = helper.decryptG(eval(`data.${item}`));

          let totalSoal = dataIsiSoal.length;

          let totabenar = 0;

          eval(`dataNialiSiswa.${item} = data;`);

          dataIsiSoal.forEach((item, i) => {
              let = {no, kunci} = item;
              if (eval(`dataNilai.jawaban${no}`) === kunci) {
                totabenar += 1;
              }
          });

          let nilaiSoal = Number(totabenar) / Number(totalSoal) * 100;

          html += `

            <a href="#/hasil-belajar-soal-mapel-data/${item}" class="col-sm-6  mt-3">
              <div class="card">
                <div class="card-body text-center" id="crud">
                  <div class="row">
                    <div class="col-sm-4">
                      <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                    </div>
                    <div class="col-sm-8 text-left">
                      <span style="font-size: 20px; font-weight: 700; color: black;">${item}</span>
                      <p class="text-dark">Nilai : ${nilaiSoal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>

          `;

          $('body #syfaul-container').html(html);
          helper.loader('toggle')

        });


      })


      helper.sesiNew('soalDataSiswa', helper.encryptG(dataNialiSiswa));

    }

  return dashboard;

})
