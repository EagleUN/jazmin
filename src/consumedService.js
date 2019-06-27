const express = require('express')
const fs = require("fs")
const router = express.Router()

const musicService = require('./musicService')

const servicewsdl = 'post.wsdl';


router.get('/musicList/:id',  
  async (req, res) => {
    try {
      const id = req.params.id
      const response = await musicService.musicListRequest(id)
      const values = response.elements[0].elements[0].elements[0].elements
      let listName
      let listUrl      
      values.forEach(object => {
        if(object.name === "listName") {
          listName = object.elements[0].text          
        } else if(object.name === "listImage") {
          listUrl = object.elements[0].text          
        }
      })         

      res.status(200).json({name: listName, url: listUrl})
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
