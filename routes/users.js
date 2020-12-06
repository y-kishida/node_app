const express = require('express');
const router = express.Router();
const db = require('../models/index');

// ユーザー一覧　GET
router.get('/', (req, res, next) => {
  db.User.findAll().then(usrs => {
    var data = {
      title: 'Users/Index',
      content: usrs
    }
    res.render('users/index', data);
  });
});

// ユーザー登録　GET,POST
router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add',
    form: new db.User(),
    err:null
  }
  res.render('users/add', data);
});

router.post('/add',(req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age
  }
  db.sequelize.sync()
  // 成功時の処理
  .then(() => db.User.create(form)
  .then(usr => {
    res.redirect('/users');
  })
  // 失敗時の処理
  .catch(err => {
    var data = {
      title: 'Users/Add',
      form: form,
      err: err
    }
    res.render('users/add', data);
  })
  )
});

// ログイン　GET,POST
router.get('/login', (req, res, next) => {
  var data = {
    title: 'User/Login',
    content: '名前とパスワードを入力ください。'
  }
  res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
  db.User.findOne({
    where: {
      name: req.body.name,
      pass: req.body.pass,
    }
  }).then(usr=>{
    if (usr != null) {
      req.session.login = usr;
      let back = req.session.back;
      if (back == null) {
        back = '/';
      }
      res.redirect(back);
    } else {
      var data = {
        title: 'Users/Login',
        content: '名前かパスワードに問題があります。再度入力ください。'
      }
      res.render('users/login', data);
    }
  })
});

module.exports = router;
