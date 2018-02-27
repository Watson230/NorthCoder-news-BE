var csvjson = require('csvjson');
var fs = require('fs');
let options = {
    delimiter : ',' , // optional
    quote     : '"' // optional
};

function CVStoJSON (filepath,options){

var file_data = fs.readFileSync(`${filepath}`, { encoding : 'utf8'});
var result = csvjson.toObject(file_data, options);

return result

}



let articlesJSON= CVStoJSON('./seed/data/articles.csv', options)

let userJSON = CVStoJSON('./seed/data/users.csv', options)

let topicsJSON = CVStoJSON('./seed/data/topics.csv', options)


module.exports =  { articlesJSON,userJSON,topicsJSON}