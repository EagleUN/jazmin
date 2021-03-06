const soapRequest = require("easy-soap-request")
const xmlToJson = require("xml-js")
const axios = require("axios")
const API_URL = 'http://eagleun-api:5000/graphql';
const Config = require('../Config');
const url = Config.get('TUMUSICA_URL');

const headers = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  "soapAction": "viewList"
}

const createXml = (email) => {
  return `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOutLists">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:viewList soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
        <listEmail xsi:type="xsd:string">${email}</listEmail>
     </urn:viewList>
  </soapenv:Body>
</soapenv:Envelope>`
}

const musicListRequest = async (id) => {
  let body =  { 
    query: `
      query {
        userById(id: {id: "${id}"}){
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
  let userEmail
  const data = await axios.post(API_URL,body, options);
  if(data.data.data){
    const user = data.data.data.userById;    
    userEmail = user.email;
    const xml = createXml(userEmail)
    const { response } = await soapRequest(url, headers, xml)
    const { body } = response
    const jsonBody = JSON.parse(xmlToJson.xml2json(body))  
    return jsonBody 
  } 
  return {}
}

module.exports = {
  musicListRequest
}
