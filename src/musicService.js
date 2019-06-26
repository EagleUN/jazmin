const soapRequest = require("easy-soap-request")
const xmlToJson = require("xml-js")

const url = "http://34.66.226.238:4000/wslists/action"
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
  const xml = createXml(id)
  const { response } = await soapRequest(url, headers, xml)
  const { body } = response
  const jsonBody = JSON.parse(xmlToJson.xml2json(body))  
  return jsonBody
}

module.exports = {
  musicListRequest
}