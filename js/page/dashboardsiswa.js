define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {}

    dashboard.view = async function() {
      if (helper.sesiGet('glearn-siswa') === null) {
        location.href="#/siswa/login";
      }else{
      	await helper.template('html/siswa/dashboard.html');
      }
    }

  return dashboard;
})
