define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}
    dashboard.view = async function() {
      await helper.template('html/siswa/pilih-guru.html');

      let data = await firebase.database().ref('guru/akun-guru/').once('value').then((value) => {
      
        let data = value.val();

        let keys = Object.keys(data);

        let html = ``;

        keys.forEach((item, i) => {
          let guru = eval(`data.${item}`);
          html +=  `
            <a href="#/siswa-kelas/${guru.username}" class="col-sm-6  mt-3">
              <div class="card">
                <div class="card-body text-center" id="crud">
                  <div class="row">
                    <div class="col-sm-4">
                      <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                    </div>
                    <div class="col-sm-8 text-left">
                      <span style="font-size: 20px; font-weight: 700; color: black;">${guru.nama}</span>
                      <p class="text-dark">${guru.story}</p>
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