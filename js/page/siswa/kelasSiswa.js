define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
      await helper.template('html/siswa/pilih-guru.html');

          $('body #text-content').text('Silahkan pilih kelas anda');

      helper.sesiNew('guru', a);

      let data = await firebase.database().ref(`guru/kelas/${a}`).once('value').then((value) => {

        let html = ``;

        let dataku = value.val();

        if (Array.isArray(dataku)) {
          dataku.forEach((item, i) => {
            let {jenjang, kelas} = item;
            html +=  `
              <a href="#/siswa-kelas-soal/${jenjang}-${kelas}" class="col-sm-6  mt-3">
                <div class="card">
                  <div class="card-body text-center" id="crud">
                    <div class="row">
                      <div class="col-sm-4">
                        <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                      </div>
                      <div class="col-sm-8 text-left">
                        <span style="font-size: 20px; font-weight: 700; color: black;">${jenjang}-${kelas}</span>
                        <p class="text-dark"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            `;
          });


            $('body #syfaul-container').html(html);
        }else{

          let myKeys = Object.keys(dataku);

          myKeys.forEach((item, i) => {
            let {jenjang, kelas} = dataku[item];
            html +=  `
              <a href="#/siswa-kelas-soal/${jenjang}-${kelas}" class="col-sm-6  mt-3">
                <div class="card">
                  <div class="card-body text-center" id="crud">
                    <div class="row">
                      <div class="col-sm-4">
                        <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                      </div>
                      <div class="col-sm-8 text-left">
                        <span style="font-size: 20px; font-weight: 700; color: black;">${jenjang}-${kelas}</span>
                        <p class="text-dark"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            `;
          });


            $('body #syfaul-container').html(html);
        }


      })

    }

  return dashboard;

})