define(['jquery', 'main', 'helper', 'frb', '@firebase/app','@firebase/auth', '@firebase/database'], function($, main, helper, frb, firebase) {
  const dashboard = {
    view: async function() {
      await helper.template('html/dashboard.html');
    }
  }

  return dashboard;
})
