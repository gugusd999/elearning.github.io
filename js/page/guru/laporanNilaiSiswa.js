define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
      await helper.template('html/siswa/pilih-guru.html');

      $('body #text-content').text('Plih kelas untuk melihat data siswa');

      helper.sesiNew('kelas', a);

      let guru = helper.decryptG(helper.sesiGet('glearn-guru'));

      let data = await firebase.database().ref(`guru/latihan-soal/${guru.username}/${a}`).once('value').then((value) => {
        let data = value.val();
        let dataKelas = Object.keys(data);

        html = ``;

        dataKelas.forEach((item, i) => {
          html += `

            <a href="#/hasil-belajar-soal-mapel/${a}/${item}" class="col-sm-6  mt-3">
              <div class="card">
                <div class="card-body text-center" id="crud">
                  <div class="row">
                    <div class="col-sm-4">
                      <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                    </div>
                    <div class="col-sm-8 text-left">
                      <span style="font-size: 20px; font-weight: 700; color: black;">${item}</span>
                      <p class="text-dark">Yuk buat kelas untuk siswa</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>

          `;

          $('body #syfaul-container').html(html);

        });


      })

    }

  return dashboard;

})
