define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
      helper.loader('show');
      await helper.template('html/siswa/pilih-guru.html');

          $('body #text-content').text('Kerjakan soalnya dengan baik dan cermat ya. priksa dulu sebelum disimpan karna tidak boleh diulang lagi untuk testnya.');

      helper.sesiNew('kelas-guru', a);

      helper.sesiNew('namaSoal', a);

      let dataSiswa = helper.decryptG(helper.sesiGet('glearn-siswa'));

      firebase.database().ref(`guru/jawaban/${helper.sesiGet('guru')}/${helper.sesiGet('kelas')}/${helper.sesiGet('namaSoal')}/${dataSiswa.nama.replace(/ /g, '_')}`)
      .once('value').then(res => {
        if (res.val() === null) {

          let path = `guru/soal/${helper.sesiGet('kelas')}/${a}/${helper.sesiGet('guru')}/`;

          console.log(path)

          let data = firebase.database().ref(`guru/soal/${helper.sesiGet('kelas')}/${a}/${helper.sesiGet('guru')}/`).once('value').then((value) => {

            let html = ``;

            let obj = {}


            let noAct = '';


            let dataku = value.val();

            if (Array.isArray(dataku)) {

              dataku.forEach((item) => {
              let {no} = item;
              eval(`obj.jawaban${no} = '';`);
              noAct = no;
            })

            helper.sesiNew('jawaban', helper.encryptG(obj));

            dataku.forEach((item, i) => {
              console.log(item)
              let {soal, no, a, b, c, d} = item;
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
              if (no != noAct) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        ${gambar_soal}
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            ${gambar_a}
                            <p>
                            A. ${a}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            ${gambar_b}
                            <p>
                            B. ${b}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            ${gambar_c}
                            <p>
                              C. ${c}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            ${gambar_d}
                            <p>
                              D. ${d}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }else{
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        ${gambar_soal}
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            ${gambar_a}
                            <p>
                            A. ${a}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            ${gambar_b}
                            <p>
                            B. ${b}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            ${gambar_c}
                            <p>
                            C. ${c}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            ${gambar_d}
                            <p>
                            D. ${d}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <button simpan-jawaban-soal >Selesai</button>
                      </div>
                    </div>
                  </div>
                `;
              }
            });

              $('body #syfaul-container').html(html);
              helper.loader('toggle');

            }else{
              let datakuKeys = Object.keys(dataku);


                // baru


                  datakuKeys.forEach((item) => {
              let {no} = dataku[item];
              eval(`obj.jawaban${no} = '';`);
              noAct = no;
            })

            helper.sesiNew('jawaban', helper.encryptG(obj));

            datakuKeys.forEach((item, i) => {
              console.log(item)
              let {soal, no, a, b, c, d} = dataku[item];

              let gambar_soal = "";
              let gambar_a = "";
              let gambar_b = "";
              let gambar_c = "";
              let gambar_d = "";
              if (dataku[item]['gambar-soal'] != null && dataku[item]['gambar-soal'] != '') {
                gambar_soal = `<img src=`+dataku[item]['gambar-soal']+` class="img-fluid" />`;
              }
              if (dataku[item]['gambar-a'] != null && dataku[item]['gambar-a'] != '') {
                gambar_a = `<img src=`+dataku[item]['gambar-a']+` class="img-fluid" />`;
              }
              if (dataku[item]['gambar-b'] != null && dataku[item]['gambar-b'] != '') {
                gambar_b = `<img src=`+dataku[item]['gambar-b']+` class="img-fluid" />`;
              }
              if (dataku[item]['gambar-c'] != null && dataku[item]['gambar-c'] != '') {
                gambar_c = `<img src=`+dataku[item]['gambar-c']+` class="img-fluid" />`;
              }
              if (dataku[item]['gambar-d'] != null && dataku[item]['gambar-d'] != '') {
                gambar_d = `<img src=`+dataku[item]['gambar-d']+` class="img-fluid" />`;
              }

              if (no != noAct) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        ${gambar_soal}
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            ${gambar_a}
                            <p>
                            A. ${a}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            ${gambar_b}
                            <p>
                            B. ${b}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            ${gambar_c}
                            <p>
                              C. ${c}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            ${gambar_d}
                            <p>
                              D. ${d}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }else{
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        ${gambar_soal}
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            ${gambar_a}
                            <p>
                            A. ${a}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            ${gambar_b}
                            <p>
                            B. ${b}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            ${gambar_c}
                            <p>
                              C. ${c}
                            </p>
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            ${gambar_d}
                            <p>
                              D. ${d}
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <button simpan-jawaban-soal >Selesai</button>
                      </div>
                    </div>
                  </div>
                `;
              }
            });

              $('body #syfaul-container').html(html);
              helper.loader('toggle');






                // baru end


            }


          })
        }else{

          let jawaban = helper.decryptG(res.val());

            console.log(jawaban);


          let nilai = 0;

          let jawabanBenar = 0;


          firebase.database().ref(`guru/soal/${helper.sesiGet('kelas')}/${a}/${helper.sesiGet('guru')}/`).once('value')
          .then((value) => {



            let dataku = value.val();


          if (Array.isArray(dataku)) {

            let data = dataku.filter((item) => {
              if (item != "") {
                return item;
              }
            });


            let totalSoal = data.length;

            data.forEach((item) => {
              let {no, kunci} = item;
              if (eval(`jawaban.jawaban${no}`) === kunci) {
                jawabanBenar += 1;
              }
            })

            nilai = Math.round(jawabanBenar / totalSoal * 100);

            console.log(nilai)



            let html = ``;


            data.forEach((item, i) => {

              if (i === 0) {
                html += `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <h3>Nilai anda adalah = ${nilai}</h3>
                      </div>
                    </div>
                  </div>
                `;
              }

              console.log(item)
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
              if (eval(`jawaban.jawaban${no}`) === kunci) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                      ${gambar_soal}
                        <p>
                        ${no}).  ${soal}
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
                    <div class="card"  style="background-color: rgba(240,228,210,1);">
                      <div class="card-body">
                      ${gambar_soal}
                        <p>
                        ${no}).  ${soal}
                        </p>
                        <p>
                          Jawaban anda salah : ${eval(`jawaban.jawaban${no}`)}). ${eval(`${eval(`jawaban.jawaban${no}`)}`)}
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

            })



              $('body #syfaul-container').html(html);
              helper.loader('toggle');


          }else{


            // -----------------------------

            let dataKeys = Object.keys(dataku);


            let data = [];


            dataKeys.forEach((item) => {
              if (dataku[item] != "") {
                data.push(dataku[item]);
              }
            });


            let totalSoal = data.length;

            data.forEach((item) => {
              let {no, kunci} = item;
              if (eval(`jawaban.jawaban${no}`) === kunci) {
                jawabanBenar += 1;
              }
            })

            nilai = Math.round(jawabanBenar / totalSoal * 100);

            console.log(nilai)



            let html = ``;


            data.forEach((item, i) => {

              if (i === 0) {
                html += `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <h3>Nilai anda adalah = ${nilai}</h3>
                      </div>
                    </div>
                  </div>
                `;
              }

              console.log(item)
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
              if (eval(`jawaban.jawaban${no}`) === kunci) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        ${gambar_soal}
                        <p>
                        ${no}).  ${soal}
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
                        ${no}).  ${soal}
                        </p>
                        <p>
                          Jawaban anda salah : ${eval(`jawaban.jawaban${no}`)}). ${eval(`${eval(`jawaban.jawaban${no}`)}`)}
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

            })



              $('body #syfaul-container').html(html);
              helper.loader('toggle');


          }






          })


          }
        })

    }

  return dashboard;

})
