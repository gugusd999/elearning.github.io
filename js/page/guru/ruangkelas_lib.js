define(['jquery', 'helper', 'frb', '@firebase/app', '@firebase/database'], function($, helper, frb, firebase) {

  const dashboard = {}

    dashboard.menu = async function(){
      let dataLogin = helper.decryptG(helper.sesiGet('glearn-guru'));

      // dapatkan data ruang kelas
      let data = await firebase.database().ref('guru/kelas/'+dataLogin.username).once('value').then((value) => {
        if (value.val() != null) {
          let html = ``;

          let data = value.val();

          if (Array.isArray(data)) {
            data.map((item, i) => {
              let {jenjang, kelas} = item;
              return  `

              <div class="col-sm-6  mt-3">
                <div class="card">
                  <div class="card-body text-center" id="crud">
                    <div class="row">
                      <div class="col-sm-4">
                        <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                      </div>
                      <div class="col-sm-8 text-left">
                        <span style="font-size: 20px; font-weight: 700; color: black;">${jenjang}/ ${kelas}</span>
                        <p class="text-dark">Yuk buat kelas untuk siswa</p>
                        <a href="#/ruang-guru/kelas/${jenjang}-${kelas}" btn-action class="btn btn-success" >lihat</a>
                        <button btn-action data="guru/kelas/${dataLogin.username}" child="${kelas}" hapus-data class="btn btn-danger" >hapus</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              `;

            }).forEach((item, i) => {
              html += item;
            });
            $('body #syfaul-container').html(html);
          }else{
            let keys = Object.keys(data);

            keys.map((item) => {
            let {jenjang, kelas} = data[item];
              return  `

              <a href="#/ruang-guru/kelas/${jenjang}-${kelas}" class="col-sm-6  mt-3">
                <div class="card">
                  <div class="card-body text-center" id="crud">
                    <div class="row">
                      <div class="col-sm-4">
                        <img class="img-fluid img-menu" src="./asset/icon-siswa.png" alt="">
                      </div>
                      <div class="col-sm-8 text-left">
                        <span style="font-size: 20px; font-weight: 700; color: black;">${jenjang}/ ${kelas}</span>
                        <p class="text-dark">Yuk buat kelas untuk siswa</p>
                        <button lihat-data class="btn btn-success" >lihat</button>
                        <button hapus-data class="btn btn-danger" >hapus</button>
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

        }
      });

    }

    return dashboard;

})
