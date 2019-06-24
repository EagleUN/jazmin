const express = require('express')
const soap = require("soap")
const app = express()
const port = 3006
const testRouter = require('./src/consumedService')
const getPostsForUser = require('./src/getPosts')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.status(200).send('Jazmin is Healthy')
})

var wsdlxml = require('fs').readFileSync('post.wsdl', 'utf8')

const postService = {
  Post_Service: {
      Post_Port: {
          getPosts: async function(args, callback) {
              const posts = await getPostsForUser.getPostsForUser(args.email.$value);
              const formattedPosts = posts.map(post => {
                return {"content": post.content, "createdAt": post.createdAt};
              })
              callback(formattedPosts)              
          }
      }
  }
};

app.use('/soapservice', testRouter)

app.listen(port, () => {
  console.log(`Jazmin running on port ${port}.`)  
})

soap.listen(app, "/soapservice", postService, wsdlxml)

module.exports = app
