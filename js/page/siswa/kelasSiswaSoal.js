define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function(a) {
      await helper.template('html/siswa/pilih-guru.html');

          $('body #text-content').text('Silahkan pilih soal');

      helper.sesiNew('kelas', a);


      let data = await firebase.database().ref(`guru/latihan-soal/${helper.sesiGet('guru')}/${a}`).once('value').then((value) => {

        let data = value.val();

        console.log(data);

        console.log(data['MAT_5-A']);

        let keys = Object.keys(data);

        let html = ``;

        keys.forEach((item, i) => {
          let guru = data[item];
          html +=  `
            <a href="#/siswa-kelas-latihan-soal/${guru.judulSoal.replace(/ /g, '_')}" class="col-sm-6  mt-3">
              <div class="card">
                <div class="card-body text-center" id="crud">
                  <div class="row">
                    <div class="col-sm-4">
                      <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                    </div>
                    <div class="col-sm-8 text-left">
                      <span style="font-size: 20px; font-weight: 700; color: black;">${guru.judulSoal}</span>
                      <p class="text-dark">${guru.keterangan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          `;
        });

          $('body #syfaul-container').html(html);
      })

    }

  return dashboard;

})
