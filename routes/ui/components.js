var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', async function(req, res, next) {

    let response = await fetch('http://localhost:3000/api/components');
    let json_data = await response.json();
    let string_data = JSON.stringify(json_data);
    res.render('components', { title: 'Components title' , data : string_data });

});


module.exports = router;