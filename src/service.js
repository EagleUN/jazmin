const soapRequest = require("easy-soap-request")
const xmlToJson = require("xml-js")

const url = "http://35.192.160.53:3000/wsbanks/action"
const headers = {
  "user-agent": "sampleTest",
  "Content-Type": "text/xml;charset=UTF-8",
  "soapAction": "checkAccount"
}

const xml = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:WashOutBank">
<soapenv:Header/>
<soapenv:Body>
   <urn:checkAccount soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <sourceAccount xsi:type="xsd:int">1</sourceAccount>
      <targetAccount xsi:type="xsd:int">1</targetAccount>
      <amount xsi:type="xsd:double">1</amount>
   </urn:checkAccount>
</soapenv:Body>
</soapenv:Envelope>`

const serviceTest = async () => {
  const { response } = await soapRequest(url, headers, xml)
  const { body } = response
  const jsonBody = JSON.parse(xmlToJson.xml2json(body))
  return jsonBody
}

module.exports = {
  serviceTest
}