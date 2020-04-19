define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
      helper.loader('show')
      await helper.template('html/siswa/pilih-guru.html');

      $('body #text-content').text(`Detail Nilai ${a}`);

      helper.sesiNew('kelas', a);

      let data1 = helper.decryptG(helper.sesiGet('soalData'));
      let data2 = helper.decryptG(helper.sesiGet('soalDataSiswa'));

      data2 = helper.decryptG(eval(`data2.${a}.${a}`));

      let html = ``;

      let totalSoal = data1.length;

      let totabenar = 0;

      data1.forEach((item, i) => {

        let {soal, no, a, b, c, d, kunci, alasan} = item;

        let gambar_soal = "";
        let gambar_a = "";
        let gambar_b = "";
        let gambar_c = "";
        let gambar_d = "";
        if (item['gambar-soal'] != null && item['gambar-soal'] != '') {
          gambar_soal = `<img src=`+item['gambar-soal']+` class="img-fluid" />`;
        }
        if (item['gambar-a'] != null && item['gambar-a'] != '') {
          gambar_a = `<img src=`+item['gambar-a']+` class="img-fluid" />`;
        }
        if (item['gambar-b'] != null && item['gambar-b'] != '') {
          gambar_b = `<img src=`+item['gambar-b']+` class="img-fluid" />`;
        }
        if (item['gambar-c'] != null && item['gambar-c'] != '') {
          gambar_c = `<img src=`+item['gambar-c']+` class="img-fluid" />`;
        }
        if (item['gambar-d'] != null && item['gambar-d'] != '') {
          gambar_d = `<img src=`+item['gambar-d']+` class="img-fluid" />`;
        }

        if (eval(`data2.jawaban${no}`) === kunci) {
          totabenar += 1;
        }

        if (eval(`data2.jawaban${no}`) === kunci) {
          html +=  `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-body">
                ${gambar_soal}
                  <p>
                    ${soal}
                  </p>
                  <p>
                    Jawaban anda benar : ${kunci}). ${eval(`${kunci}`)}
                    ${eval(`gambar_${kunci}`)}
                  </p>
                  <p>
                    Keterangan : ${alasan}
                  </p>
                </div>
              </div>
            </div>
          `;
        }else{
          html +=  `
            <div class="col-sm-12 mt-3">
              <div class="card" style="background-color: rgba(240,228,210,1);">
                <div class="card-body">
                ${gambar_soal}
                  <p>
                    ${soal}
                  </p>
                  <p>
                    Jawaban anda salah : ${eval(`data2.jawaban${no}`)}). ${eval(`${eval(`data2.jawaban${no}`)}`)}
                    ${eval(`gambar_${eval(`jawaban.jawaban${no}`)}`)}
                  </p>
                  <p>
                    Jawaban yang benar : ${kunci}). ${eval(`${kunci}`)}
                    ${eval(`gambar_${kunci}`)}
                  </p>
                  <p>
                    Keterangan : ${alasan}
                  </p>
                </div>
              </div>
            </div>
          `;
        }

      });


        let nilaiSoal = Number(totabenar) / Number(totalSoal) * 100;

        $('body #text-content').html(`
          <h1>
            Jawaban ${a}
          </h1>
          <h1>
            Nilai : ${nilaiSoal}
          </h1>
          `);


        $('body #syfaul-container').html(html);
        helper.loader('toggle')





    }

  return dashboard;

})
