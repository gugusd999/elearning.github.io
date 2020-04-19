define(['jquery', 'helper', 'frb', '@firebase/app', '@firebase/database'], function($, helper, frb, firebase) {

  const kelas_lib = {}

    kelas_lib.menu = async function(){
      helper.loader('show');

      let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

      let kelas = helper.sesiGet('kelas');
      let soal = helper.sesiGet('soal');

      // dapatkan data ruang kelas
      let data = await firebase.database().ref(`guru/soal/${kelas}/${soal}/`+dataLogin.username+'/').once('value').then((value) => {
        if (value.val() != null) {
          let html = ``;

          let dataku = value.val();

          let soalS = soal;

        if (Array.isArray(dataku)) {

            dataku.map((item, i) => {
            let {soal, a, b, c, d, no, kunci, alasan} = item;
            let gambar_soal = "";
            let gambar_a = "";
            let gambar_b = "";
            let gambar_c = "";
            let gambar_d = "";
            if (item['gambar-soal'] != null) {
              gambar_soal = item['gambar-soal'];
            }
            if (item['gambar-a'] != null) {
              gambar_a = item['gambar-a'];
            }
            if (item['gambar-b'] != null) {
              gambar_b = item['gambar-b'];
            }
            if (item['gambar-c'] != null) {
              gambar_c = item['gambar-c'];
            }
            if (item['gambar-d'] != null) {
              gambar_d = item['gambar-d'];
            }
            return `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-header">
                  <span class="card-title">Soal No. ${no}</span>
                </div>
                <div class="card-body">
                  <img src="${gambar_soal}" class="img-fluid"/>
                  <p>
                    ${soal}
                  </p>
                  <p>
                    pilihan :
                  </p>
                    <div>
                    <img src="${gambar_a}" class="img-fluid"/>
                      <p>a) ${a}</p>
                    </div>
                    <div>
                    <img src="${gambar_b}" class="img-fluid"/>
                      <p>b) ${b}</p>
                    </div>
                    <div>
                    <img src="${gambar_c}" class="img-fluid"/>
                      <p>c) ${c}</p>
                    </div>
                    <div>
                    <img src="${gambar_d}" class="img-fluid"/>
                      <p>d) ${d}</p>
                    </div>
                  <div>
                    <span>Jawaban yang benar : ${kunci})</span>
                  </div>
                  <div>
                    <span>Alasan: </span>
                    <p>${alasan}</p>
                  </div>
                  <div class="card-footer">
                    <button btn-action style="max-width:120px;" data="guru/soal/${kelas}/${soalS}/${dataLogin.username}/" child="${no}" hapus-data class="btn btn-danger" >hapus</button>
                  </div>
                </div>
              </div>
            </div>
            `;
          }).forEach((item) => {
            html += item;
          });
          $('body #syfaul-container').html(html);
          helper.loader('toggle');


        }else{

          let datakuS = Object.keys(dataku);


          datakuS.map((item, i) => {
            let {soal, a, b, c, d, no, kunci, alasan} = dataku[item];
            let gambar_soal = "";
            if (dataku[item]['gambar-soal'] != null) {
              gambar_soal = dataku[item]['gambar-soal'];
            }
            return `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-header">
                  <span class="card-title">Soal No. ${no}</span>
                </div>
                <div class="card-body">
                  <img src="${gambar_soal}" class="img-fluid"/>
                  <p>
                    ${soal}
                  </p>
                  <p>
                    pilihan :
                  </p>
                  <ul>
                    <li>a) ${a}</li>
                    <li>b) ${b}</li>
                    <li>c) ${c}</li>
                    <li>d) ${d}</li>
                  </ul>
                  <div>
                    <span>Jawaban yang benar : ${kunci})</span>
                  </div>
                  <div>
                    <span>Alasan: </span>
                    <p>${alasan}</p>
                  </div>
                  <div class="card-footer">
                    <button btn-action style="max-width:120px;" data="guru/soal/${kelas}/${soalS}/${dataLogin.username}/" child="${no}" hapus-data class="btn btn-danger" >hapus</button>
                  </div>
                </div>
              </div>
            </div>
            `;
          }).forEach((item) => {
            html += item;
          });
          $('body #syfaul-container').html(html);
          helper.loader('toggle');


        }



        }
      });

    }

    return kelas_lib;

})
