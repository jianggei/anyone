const http = require('http')
const conf = require('./config/configServers')
const chalk = require('chalk')
const path = require('path')
const router = require('./router/router')
const server = http.createServer((req , res) => {
    
    const filePath = path.join(conf.root , req.url) 
    router(req, res , filePath)

})

server.listen( conf.port , conf.hostname , (err) => {
    let d = `http://${conf.hostname}:${conf.port}`
    console.log(`the server is run ${chalk.green(d)}`)
})