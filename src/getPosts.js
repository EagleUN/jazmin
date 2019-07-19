const axios = require("axios");

const API_URL = 'http://eagleun-api:5000/graphql';

const getPostsForUser = async (userEmail) => {
  let body =  { 
    query: `
      query {
        userByEmail(email: {email: "${userEmail}"}){
          id
          email
          name
          last_name
        }
      }
    `, 
    variables: {}
  }
  let options = {
    headers: {
        'Content-Type': 'application/json'
    }
  }

  let userId;
  const data = await axios.post(API_URL,body, options);
  if(data.data.data){
    const user = data.data.data.userByEmail;
    userId = user.id;
    const posts = getPosts(userId);
    return posts;
  }
  return {};
}

const getPosts = async (userId) => {
  let body =  { 
    query: `
      query {
        postsByCreatorId(id:"${userId}") {
          id
          idCreator
          content
          createdAt
        }
      }
  `, 
    variables: {}
  }
  let options = {
    headers: {
        'Content-Type': 'application/json'
    }
  }
  const data = await axios.post(API_URL,body, options);
  if(data.data.data){
    const posts = data.data.data.postsByCreatorId;
    return posts;
  }
  return {};
}

module.exports = {
  getPostsForUser,
}
