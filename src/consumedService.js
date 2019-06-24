const express = require('express')
const fs = require("fs")
const router = express.Router()

const service = require('./service')

const servicewsdl = 'post.wsdl';


router.get('/test',  
  async (req, res) => {
    try {
      const response = await service.serviceTest();
      console.log(response)
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json(err)
    }
  }
)

router.get('/', function(req, res, next) {
  if(req.query.wsdl === ""){
    res.setHeader('Content-Type', 'application/xml');
    res.statusCode = 200;
    fs.readFile(servicewsdl, "utf8", function (err, data) {
      if (err) {
        endResponse(err);
      } else {
        endResponse(data);
      }
    });
  } else {
    endResponse("Invalid Request")
  }

  function endResponse(data) {
    res.write(data);
    res.end();
    next();
  }  
})

module.exports = router
