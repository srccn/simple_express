var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('cookieName', 'cookieValue');
  res.render('index', { title: 'Express' , cook: 'cookieValueaa' });
});

router.get('/deletecookie', (req, res) => {
  //show the saved cookies
  cookie = req.cookies;
  for (var prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.cookie(prop, '', {expires: new Date(0)});
  }
  res.send('Cookie has been deleted successfully');
  res.end();
});

module.exports = router;
