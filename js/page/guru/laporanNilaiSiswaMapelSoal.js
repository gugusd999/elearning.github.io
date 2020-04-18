define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
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

        if (eval(`data2.jawaban${no}`) === kunci) {
          totabenar += 1;
        }

        if (eval(`data2.jawaban${no}`) === kunci) {
          html +=  `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-body">
                  <p>
                    ${soal}
                  </p>
                  <p>
                    Jawaban anda benar : ${kunci}). ${eval(`${kunci}`)}
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
                  <p>
                    ${soal}
                  </p>
                  <p>
                    Jawaban anda salah : ${eval(`data2.jawaban${no}`)}). ${eval(`${eval(`data2.jawaban${no}`)}`)}
                  </p>
                  <p>
                    Jawaban yang benar : ${kunci}). ${eval(`${kunci}`)}
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





    }

  return dashboard;

})
