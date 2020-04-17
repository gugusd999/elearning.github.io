define([
  'jquery'
  , 'main'
  , 'helper'
  , 'frb'
  , 'soal_lib'
  , '@firebase/app'
  , '@firebase/database'], function(
    $
    , main
    , helper
    , frb
    , soal_lib
    , firebase
    ) {

  const dashboard = {}

    dashboard.view = async function(kelas, soal) {
      if (helper.sesiGet('glearn-guru') === null) {
        location.href="#/guru/login";
      }else{
        
        await helper.template('html/guru/soal.html');
          
        $('body #kelas-title').html(soal.replace(/\_/g, ' '));
        $('body input[name="kelas"]').val(soal);
        
        helper.sesiNew('kelas', kelas);
        helper.sesiNew('soal', soal);

        $('body [modal-open]').attr('table-name', `guru/soal/${kelas}/${soal}/`)

        soal_lib.menu();

      }
    }

  return dashboard;
})
