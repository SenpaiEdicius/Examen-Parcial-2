var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  //http://localhost:3000/api/employee/all
  router.get('/all', (req, res) => {
   empModel.getEmployees((err, users)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(users);
  });
  });// all

  //http://localhost:3000/api/employee/byid/5e68260c06118f0ae8a309b4
router.get('/byid/:id',(req, res)=>{
  var id =  req.params.id ;
  empModel.getEmployeesById(id, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});

// http://localhost:3000/api/employee/bycompany/CONJURICA
router.get('/bycompany/:company',(req, res)=>{
  var company =  req.params.company ;
  empModel.getEmployeesByCompany(company, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});

// http://localhost:3000/api/employee/bytag/aliquip
router.get('/bytag/:tag',(req, res)=>{
  var tag =  req.params.tag ;
  empModel.getEmployeesByTag(tag, (err, doc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(doc);
  });
});

// http://localhost:3000/api/employee/addtag/:id
router.post('/addtag/:id', (req, res, next)=>{
  var id = req.params.id;
  var tag = req.body.tag;

  empModel.addEmployeeATag(tag,id, (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(result);
  });
});

//http://localhost:3000/api/employee/delete/5c871f24fcc06c827a5818c6
router.delete('/delete/:id', (req, res)=>{
  var id = req.params.id;
  empModel.removeEmployee(id, (err, deletedDoc)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(deletedDoc);
  });
});

//http://localhost:3000/api/employee/makeolder
router.post('/makeolder', (req, res, next)=>{
  var data = req.body;
  empModel.increaseAgeToAll(data, (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({"error":"error"});
    }
    return res.status(200).json(result);
  });
});

  
  return router;
}

module.exports = initEmployee;
