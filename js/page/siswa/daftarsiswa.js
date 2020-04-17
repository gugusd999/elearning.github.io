define(['jquery', 'main', 'helper', 'frb'], function($, main, helper, frb, firebase) {

  const dashboard = {
    view: async function() {
      await helper.template('html/siswa/daftar.html');
    }
  }

  return dashboard;
})
