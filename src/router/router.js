const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const handlebars = require('handlebars')


const stat = promisify(fs.stat)
const conf = require('../config/configServers')
const data = fs.readFileSync(__dirname+'/../template/dir.tpl')
const readdir = promisify(fs.readdir)
const template = handlebars.compile(data.toString());
module.exports = async (req , res , filePath) => {
    res.statusCode = 200
    res.setHeader('Content-type' , 'text/html' );
    try{
        const file = await stat(filePath);
        if(file.isFile()){
          
            fs.createReadStream(filePath).pipe(res)

        }else if(file.isDirectory()){

            const files = await readdir(filePath)
            const relatievPath = path.relative( conf.root , filePath )
            const data = {
                dir:relatievPath ? relatievPath : '',
                files
            }

            res.end(template(data))
        }

    }
    catch(err){
        res.statusCode = 404
        res.setHeader('Content-type' , 'text/html');
        res.end(`no such file or directory\n ${err}`);
        return;

    }
}