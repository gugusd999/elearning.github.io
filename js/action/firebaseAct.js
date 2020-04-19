define(['jquery', 'helper', 'select2', 'frb'
, 'ruangkelas'
, 'kelas'
, 'soal_lib'
, '@firebase/app', '@firebase/auth', '@firebase/database'], function($, helper, select2, frb
, ruangkelas
, kelas
, soal_lib
, firebase){


let formdata = [];

let dataJawaban = {};


function bacagambarnya(input){

  let getTarget = input.getAttribute('target');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e){
            $(`body [input-preview-${getTarget}]`).val(e.target.result);
            $(`body [img-preview-${getTarget}]`).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}



$('body').on('change', '[gambar-upload]', function(event){
  event.preventDefault();
  bacagambarnya(this);
});




// parametr pertama judul
// parametr kedua object
function getData(a){
  let getData = formdata.filter((item) => {
    if (item.nama === a) {
      return item;
    }
  })[0];

  return getData
}


function formIsi(a, b){

  console.log(b);

  let getData = formdata.filter((item) => {
    if (item.nama === a) {
      return item;
    }
  })[0];

  let keys = Object.keys(b);

  if (getData === undefined) {
    formdata.push({
      nama: a,
      data: {}
    })

    formdata.map((item, i) => {
      if (item.nama === a) {
        keys.forEach((res, i) => {
          eval(`item.data.${res} = b.${res};`);
        });

      }
    })


  }else{

    formdata.map((item, i) => {
      if (item.nama === a) {
        keys.forEach((res, i) => {
          console.log(b[res]);
          item['data'][res] = b[res];
            // eval(`item.data.${res} = b.${res};`);
        });

      }
    })

  }

}

function makeObj(a, b){
  let data = {}
  data[a] = b;
  return data;

}

firebase.initializeApp(frb.config);


function login(obj, key, tableName, auth, sebagai){
  helper.loader('show');
  obj.forEach((res) => {
    formIsi(
      res.getAttribute('data-table'),
      makeObj(
        res.getAttribute('name'),
        res.value
      )
    );
  })

  let {nama, data} = getData(tableName);

  let uid = eval(`data.${key}`);

  let authData = eval(`data.${auth}`);

  let path = nama+'/'+uid;

  // cek data exist

  firebase.database().ref(path).once('value').then(res => {
    if (res.val() != null) {
      if (eval(`res.val().${auth}`) === authData) {
        console.log(sebagai);
        if (sebagai === 'siswa') {
          helper.sesiNew('glearn-siswa', helper.encryptG(res.val()));
          location.href = '#/';
          helper.loader('toggle');
        }else{
          helper.sesiNew('glearn-guru', helper.encryptG(res.val()));
          location.href = '#/';
          helper.loader('toggle');
        }
      }
    }
  })
}

async function hapus(a, b){
  console.log(a);
  console.log(b);
  await firebase.database().ref(a).child(b).remove();
  location.reload();
}

$('body').on(`click`, '[hapus-data]', function(event){
  event.preventDefault();
  var r = confirm("Kamu yakin ingin menghapus data ini!");
  if (r == true) {
    hapus($(this).attr('data'), $(this).attr('child'));
  } else {

  }
})


function create(obj, key, tableName, action, keyData){
  helper.loader('show');
  obj.forEach((res) => {
    formIsi(
      res.getAttribute('data-table'),
      makeObj(
        res.getAttribute('name'),
        res.value
      )
    );
  })

  let {nama, data} = getData(tableName);

  console.log(data);

  console.log(key);

  let uid = eval(`data.${key}`).replace(/ /g, '_');

  let path = nama+'/'+uid;

  if (keyData != undefined) {
    path = nama+'/'+keyData.replace(/ /g, '_')+'/'+uid;
  }

  // cek data exist

  firebase.database().ref(path).once('value').then(res => {
    if (res.val() === null) {
      firebase.database().ref(path).set(data).then(function(){
          eval(action);
          helper.loader('toggle');
      });
    }else{
      helper.loader('toggle');
      alert('maaf username sudah digunakan');
    }
  })
}


$("body").on('click', '[simpan-jawaban-soal]', function(event){

  event.preventDefault();
  let data = helper.sesiGet('jawaban');

  let dataSiswa = helper.decryptG(helper.sesiGet('glearn-siswa'));


  firebase.database().ref(`guru/jawaban/${helper.sesiGet('guru')}/${helper.sesiGet('kelas')}/${helper.sesiGet('namaSoal')}/${dataSiswa.nama.replace(/ /g, '_')}`)
  .set(data)
  .then(function(){
      console.log('disimpan')
      location.reload();
  });


})


$("body").on('change', '[data-jawaban]', function(event){

  event.preventDefault();

  let data = helper.decryptG(helper.sesiGet('jawaban'));

  let value = $(this).val();
  let name = $(this).attr('name');

  eval(`data.${name} = value;`);

  helper.sesiNew('jawaban', helper.encryptG(data));

})

$("body").on('click', '[guru-log-out]', function(event){
  event.preventDefault();

  helper.sesiRemove('glearn-guru');

  location.href = '#/guru/login';

})

$("body").on('click', '[data-login]', function(event){
  event.preventDefault();


  let dataSebagai = undefined;

  if ($(this).attr('data-sebagai') != undefined) {
    dataSebagai = $(this).attr('data-sebagai');
  }


  let dataO = document.querySelectorAll('[data-table]');

  let tableName = $(this).attr('get-data');

  let key = $(this).attr('data-key');

  let auth = $(this).attr('data-auth');

  let validate = Array.from(dataO).filter((item) => {
    if (item.value === "") {
      return item;
    }
  });

  if (validate.length === 0) {
      login(dataO, key, tableName, auth, dataSebagai);
  }else{
      validate[0].focus();
  }

})

  $("body").on('click', '[data-simpan]', function(event){
    event.preventDefault();

    let dataO = document.querySelectorAll('[data-table]');

    // console.log(dataO)

    let keyData = undefined;
    if ($(this).attr('key') != undefined) {
      keyData = $(this).attr('key');
    }

    let tableName = $(this).attr('get-data');

    let key = $(this).attr('data-key');

    let action = $(this).attr('action-script');

    let validate = Array.from(dataO).filter((item) => {
      if (item.getAttribute('type') != 'hidden') {
        if (item.value === "") {
          return item;
        }
      }
    });

    console.log(tableName)


    if (validate.length === 0) {
        create(dataO, key, tableName, action, keyData);
    }else{
        validate[0].focus();
    }

  })




});
