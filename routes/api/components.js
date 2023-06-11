var express = require('express');
var router = express.Router();

components = [
    { "id" : 1 , "name" : "openssl", "project_url" : "https://www.openssl.org/" },
    { "id" : 2 , "name" : "SQLite", "project_url" : "https://www.sqlite.org/index.html" },
    { "id" : 3 , "name" : "CUDA Toolkit", "project_url" : "https://developer.nvidia.com/cuda-toolkit" }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('cookieName', 'cookieValue');
  res.setHeader('content-type', 'text/plain');
  res.send(JSON.stringify(components));
});

router.get('/:id', function(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    let id = req.params.id;
    components_found = components.filter((elem)=>{ return elem.id == id })
    res.send(JSON.stringify(components_found));
});

router.put('/:id', function(req, res, next) {

  if ( (! req.body.name) || (! req.body.project_url) ) {
    res.send("Wrong data posted.");
    return;
  }

  let name = req.body.name,
   project_url = req.body.project_url;

  res.setHeader('content-type', 'text/plain');
  let id = req.params.id;

  //update
  let objIndex = components.findIndex((elem => elem.id == id));

  if ( objIndex < 0 ) {
    res.send(`Component ${id} not found.`);
    return;
  }

  components[objIndex].name = name;
  components[objIndex].project_url = project_url;

  res.send(JSON.stringify(components[objIndex]));
});


router.post('/new', function(req, res, next) { // add new

  console.log(JSON.stringify(req.body));

  if ( (! req.body.name) || (! req.body.project_url) ) {
    res.send("Wrong data posted.");
    return;
  }

  let name = req.body.name,
   project_url = req.body.project_url;

  const largest_id = Math.max(...components.map((elem)=>{return parseInt(elem.id)}))
  
  let comp_names = components.map((elem)=>{return elem.name})

  if ( comp_names.includes(name) ) {
    
  } else {

    components.push(
      {
        "id" : (largest_id + 1).toString(),
        "name" : name,
        "project_url" : project_url
      }
    )
  }

  res.setHeader('content-type', 'text/plain');
  res.send(JSON.stringify(components));
});



module.exports = router;
