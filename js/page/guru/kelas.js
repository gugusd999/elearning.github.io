define([
  'jquery'
  , 'main'
  , 'helper'
  , 'frb'
  , 'kelas'
  , '@firebase/app'
  , '@firebase/database'], function(
    $
    , main
    , helper
    , frb
    , kelas
    , firebase
    ) {

  const dashboard = {}

    dashboard.view = async function(a) {
      if (helper.sesiGet('glearn-guru') === null) {
        location.href="#/guru/login";
      }else{
        
        await helper.template('html/guru/kelas.html');
          
        $('body #kelas-title').html(a);
        $('body input[name="kelas"]').val(a);
        

        helper.sesiNew('key', a);

        kelas.menu();

        $("body [data-simpan]").attr('key', a);

      }
    }

  return dashboard;
})
