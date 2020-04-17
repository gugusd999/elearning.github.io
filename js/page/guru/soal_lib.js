define(['jquery', 'helper', 'frb', '@firebase/app', '@firebase/database'], function($, helper, frb, firebase) {

  const kelas_lib = {}

    kelas_lib.menu = async function(){
      let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

      let kelas = helper.sesiGet('kelas');
      let soal = helper.sesiGet('soal');

      // dapatkan data ruang kelas
      let data = await firebase.database().ref(`guru/soal/${kelas}/${soal}/`+dataLogin.username+'/').once('value').then((value) => {
        if (value.val() != null) {
          let html = ``;

          let dataku = value.val();

        if (Array.isArray(dataku)) {

            dataku.map((item, i) => {
            let {soal, a, b, c, d, no, kunci, alasan} = item;
            return `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-header">
                  <span class="card-title">Soal No. ${no}</span>
                </div>
                <div class="card-body">
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
                </div>
              </div>
            </div>
            `;
          }).forEach((item) => {
            html += item;
          });
          $('body #syfaul-container').html(html);


        }else{

          let datakuS = Object.keys(dataku);


          datakuS.map((item, i) => {
            let {soal, a, b, c, d, no, kunci, alasan} = dataku[item];
            return `
            <div class="col-sm-12 mt-3">
              <div class="card">
                <div class="card-header">
                  <span class="card-title">Soal No. ${no}</span>
                </div>
                <div class="card-body">
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
                </div>
              </div>
            </div>
            `;
          }).forEach((item) => {
            html += item;
          });
          $('body #syfaul-container').html(html);


        }

          

        }
      });

    }

    return kelas_lib;

})
