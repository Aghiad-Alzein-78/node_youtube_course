const {logEvents} = require('./logEvents');
const {set} = require('date-fns');
const http = require('http');
const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
const {
    print
} = require('../utils');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// 
// 

const getContentType = (extension) => {
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
            break;
    }
    return contentType;
}

const serveFile = async (filePath, contentType, response) => {
    try {
        const data = await fsPromises.readFile(filePath,contentType.includes('image')?'':'utf-8');
        response.writeHead(
            filePath.includes('404.html')?404:200, 
            {
            'Content-type': contentType
        })
        response.end(data)
    } catch (err) {
        print(err);
        myEmitter.emit('log',logEvents(`${err.name}\t${err.messgae}`,'reqError.txt'))
        response.statusCode = 500;
        response.end();
    }
}

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    print(req.url, req.method);
    myEmitter.emit('log',logEvents(`${req.url}\t${req.socket.remoteAddress}`,'reqLog.txt'))
    const extension = path.extname(req.url);
    let contentType = getContentType(extension);

    let filePath;

    if (contentType === 'text/html' && req.url === '/') {
        filePath = path.join(__dirname, 'views', 'index.html');
    } else if (contentType === 'text/html' && req.url.slice(-1) === '/') {
        print("SubSituation")
        filePath = path.join(__dirname, 'views', req.url, 'index.html')
    } else if (contentType === 'text/html') {
        filePath = path.join(__dirname,'views', req.url);
    } else {
        filePath=path.join(__dirname, req.url);
    }
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    print(filePath);
    fileExists = fs.existsSync(filePath);
    if (fileExists) {
        print(filePath,contentType)
        serveFile(filePath, contentType, res)
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                res.writeHead(301, {
                    'Location': '/new-page.html'
                });
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301, {
                    'Location': '/'
                });
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, 'views', '404.html'), contentType, res)
                break;
        }
        // res.writeHead(200,{'content-type':contentType})
        // res.end(path.join(__dirname,'views','404.html'))

    }

});
myEmitter.on('log',(msg,filename)=>{logEvents(msg,filename)});
server.listen(PORT, '127.0.0.1', () => print(`Server running on port ${PORT}`))