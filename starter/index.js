// '##::::'##::::'###::::'########::'########::::'########::'##:::'##:::::'##:::::'########:::::'###::::'##:::'##::'######::'##::::'##:
//  ###::'###:::'## ##::: ##.... ##: ##.....::::: ##.... ##:. ##:'##:::::'####:::: ##.... ##:::'## ##::: ##::'##::'##... ##: ##:::: ##:
//  ####'####::'##:. ##:: ##:::: ##: ##:::::::::: ##:::: ##::. ####::::::. ##::::: ##:::: ##::'##:. ##:: ##:'##::: ##:::..:: ##:::: ##:
//  ## ### ##:'##:::. ##: ##:::: ##: ######:::::: ########::::. ##::::::::..:::::: ##:::: ##:'##:::. ##: #####::::. ######:: #########:
//  ##. #: ##: #########: ##:::: ##: ##...::::::: ##.... ##:::: ##::::::::'##::::: ##:::: ##: #########: ##. ##::::..... ##: ##.... ##:
//  ##:.:: ##: ##.... ##: ##:::: ##: ##:::::::::: ##:::: ##:::: ##:::::::'####:::: ##:::: ##: ##.... ##: ##:. ##::'##::: ##: ##:::: ##:
//  ##:::: ##: ##:::: ##: ########:: ########:::: ########::::: ##:::::::. ##::::: ########:: ##:::: ##: ##::. ##:. ######:: ##:::: ##:
// ..:::::..::..:::::..::........:::........:::::........::::::..:::::::::..::::::........:::..:::::..::..::::..:::......:::..:::::..::





const fs=require('fs');
const http=require('http');
const path = require('path');
const url=require('url');
const slugify = require('slugify');
const callByString = "Hello Guys there is an updata bout the timing of my success, it preponed quite a bit so you better work hard to even watch me flying.";
// fs.writeFile('./txt/new.txt',callByString,(error,data)=>{
//     if(error){
//         console.log(error);
//     }
// })
let record=fs.readFileSync('./txt/new.txt','utf-8',(error,data)=>{
    if(error) console.log(error);
})
// console.log(record);
// function hello(){
//     console.log('Hello World');
// }
// hello();  

//server here!!
//console.log(slugify('Taza-Faal',{lower:true}));
const placeHolder = (template,product)=>
{
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}
const tempProduct = fs.readFileSync(`/home/daksh/Desktop/complete-node-bootcamp-master/1-node-farm/starter/templates/template-product.html`,'utf-8');
const apiData=fs.readFileSync('/home/daksh/Desktop/complete-node-bootcamp-master/1-node-farm/starter/dev-data/data.json','utf-8');
const apiDatatoArray = JSON.parse(apiData);
const templateOverview=fs.readFileSync('/home/daksh/Desktop/complete-node-bootcamp-master/1-node-farm/starter/templates/template-overview.html','utf-8');
const templateCard=fs.readFileSync('/home/daksh/Desktop/complete-node-bootcamp-master/1-node-farm/starter/templates/template-card.html','utf-8');
//const templateProduct=fs.readFileSync('./starter/templates/teamplate-product.html','utf-8');
const slugifyURL = apiDatatoArray.map(el=>slugify(el.productName,{lower:true}));
//console.log(slugifyURL);
const server=http.createServer((req,res)=>{
    const { query, pathname } = url.parse(req.url, true);
    //console.log(query);
    const pathName = req.url;
    //overview page
    if(pathname==="/" || pathname==="/overview"){
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        const cardHtml = apiDatatoArray.map(e => placeHolder(templateCard,e)).join(" ");
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
        res.end(output);

    //dummy page
    }else if(pathname === '/product'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });
        const product = apiDatatoArray[query.id];
        const output = placeHolder(tempProduct, product);
        res.end(output);
    
    //page not found
    }else{
        res.writeHead(404,{
            'Content-Type':'text/html'
        });
        res.end("<h1>Page not found. Lol</h1>")
    }
    
});

server.listen(3000,()=>{
    console.log(`Server listening on port 3000`);
})