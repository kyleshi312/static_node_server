const http = require('http')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const conf = require('./conf')

const server = http.createServer((req, res) => {
    const filepath = path.join(conf.root, req.url)
    console.info('req.url', req.url)
    fs.stat(filepath, (err, stats) => {
        console.log('stat', filepath)
        if (err) {
            res.statusCode = 404
            res.setHeader('content-type','text/plain')
            res.end(`Error the wrong path ${filepath}`)
        }
        if (stats.isFile()) {
            res.statusCode = 200
            res.setHeader('content-type','text/plain')
            fs.createReadStream(filepath).pipe(res)
        } else if (stats.isDirectory()) {
            fs.readdir(filepath, (err, files) => {
                console.info('files', files)
                res.statusCode = 200
                res.setHeader('content-type','text/plain')
                res.end(files.join(','))
            })
        }
    })
// fs.stat()
})

server.listen(conf.port, conf.hostname, () => {
console.info('err')
    console.info(`the server listen on ${chalk.green(3000)}`)
})