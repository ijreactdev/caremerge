  var express = require('express');

  var router = express.Router();
  router.get('/I/want/title', function(req, res) {
  let urls = req.query.address
  var urlsData=Array.isArray(urls)?urls:Array(urls)


///// function to get parts of url
var setErr=''
 function callUrl()
{

    var pathname= urlsData.map((item)=>{
    var errUrl=!(item.includes("."))? `${item} - NO RESPONSE`:"valid"
    var path=String(item).match(/(?<!\?.+)(?<=\/)[\w-]+(?=[/\r\n?]|$)/g)
    var hostName=path?String(item).split("/")[0]:String(item)
    path=path?String(path).toUpperCase():"no"
    var domain=  item.replace(/.+\/\/|www.|\..+/g, '')
    var domainCap=path!="no"? String(domain).toUpperCase():String(domain).charAt(0).toUpperCase() + String(domain).slice(1)
    var subDomain=String(item).split(domain)[1]
    subDomains=subDomain.includes("/")?subDomain.split("/")[0]:subDomain
    var fullDomainCaps=String(hostName.includes("www.")?hostName.split("www.")[1]:hostName).toUpperCase()


    return {url:item,domain:domainCap,path:path,fullDomain:hostName,fullDomainCaps,validUrl:errUrl}
  })

    return pathname;
}

///// sending response as HTML format
    res.send(`<html> 
    <head>
    </head>
    <body>

    <h1> The followings are the titles of the websites:</h1>
    <ul>
    ${(callUrl().map((item,i)=>
      ` <li> ${item.validUrl=="valid"? item.path !="no"? item.fullDomain+" - "+'"'+item.path +" - "+item.fullDomainCaps +'"':
      item.fullDomain+" - "+'"'+item.domain+'"':
      item.validUrl  }</li>`)) }
      </ul>
  
    </body>
    </html>`);

    });



module.exports = router;
