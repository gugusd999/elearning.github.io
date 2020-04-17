define(['jquery', 'helper', 'frb', '@firebase/app', '@firebase/database'], function($, helper, frb, firebase) {

  const kelas_lib = {}

    kelas_lib.menu = async function(){
      let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

      let theKey = helper.sesiGet('key');

      // dapatkan data ruang kelas
      let data = await firebase.database().ref('guru/latihan-soal/'+dataLogin.username+'/'+theKey).once('value').then((value) => {
        if (value.val() != null) {
          let dataGet = value.val();
          let keys = Object.keys(dataGet);
          let html = ``;
          console.log(keys)
          keys.map((item, i) => {
            let {judulSoal, kelas, keterangan} = eval(`dataGet.${item}`) ;
            return  `

            <a href="#/ruang-guru/soal-latihan/${theKey}/${judulSoal.replace(/ /g, '_')}" class="col-sm-6  mt-3">
              <div class="card">
                <div class="card-body text-center" id="crud">
                  <div class="row">
                    <div class="col-sm-4">
                      <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                    </div>
                    <div class="col-sm-8 text-left">
                      <span style="font-size: 20px; font-weight: 700; color: black;">${judulSoal}</span>
                      <p class="text-dark">Semangat Belajarnya</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
            `;

          }).forEach((item, i) => {
            html += item;
          });
          $('body #syfaul-container').html(html);
        }
      });

    }

    return kelas_lib;

})
