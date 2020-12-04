var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
