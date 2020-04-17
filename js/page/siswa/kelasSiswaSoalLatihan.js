define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
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
              if (no != noAct) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            A. ${a}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            B. ${b}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            C. ${c}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            D. ${d}
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
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            A. ${a}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            B. ${b}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            C. ${c}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            D. ${d}
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
              if (no != noAct) {
                html +=  `
                  <div class="col-sm-12 mt-3">
                    <div class="card">
                      <div class="card-body">
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            A. ${a}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            B. ${b}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            C. ${c}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            D. ${d}
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
                        <p>${no}). ${soal}</p>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="a${no}" value="a">
                          <label class="form-check-label" for="a${no}">
                            A. ${a}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="b${no}" value="b">
                          <label class="form-check-label" for="b${no}">
                            B. ${b}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="c${no}" value="c">
                          <label class="form-check-label" for="c${no}">
                            C. ${c}
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" data-jawaban name="jawaban${no}" id="d${no}" value="d">
                          <label class="form-check-label" for="d${no}">
                            D. ${d}
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
              if (eval(`jawaban.jawaban${no}`) === kunci) {
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
                    <div class="card">
                      <div class="card-body">
                        <p>
                          ${soal}
                        </p>
                        <p>
                          Jawaban anda salah : ${eval(`jawaban.jawaban${no}`)}). ${eval(`${eval(`jawaban.jawaban${no}`)}`)}
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

            })



              $('body #syfaul-container').html(html);


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
              if (eval(`jawaban.jawaban${no}`) === kunci) {
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
                    <div class="card">
                      <div class="card-body">
                        <p>
                          ${soal}
                        </p>
                        <p>
                          Jawaban anda salah : ${eval(`jawaban.jawaban${no}`)}). ${eval(`${eval(`jawaban.jawaban${no}`)}`)}
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

            })



              $('body #syfaul-container').html(html);


          }



            


          })

          
          }
        })

    }

  return dashboard;

})