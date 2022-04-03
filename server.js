
let http = require('http')
let fs = require('fs')
let url = require('url')
let port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let server = http.createServer(function (request, response) {
  let parsedUrl = url.parse(request.url, true)
  let pathWithQuery = request.url
  let queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  let path = parsedUrl.pathname
  let query = parsedUrl.query
  let method = request.method

  /******** 从这里开始看，上面不要看 ************/



  console.log("路径带查询参数：");
  console.log(request.url);
  console.log("请求方法：");
  console.log(method);
  console.log("请求头：");
  console.log(request.headers);

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="/x">
        </head>
        <body>
            <h1>标题</h1>
        </body>
    
    `)
    response.end()    //如果请求路径为‘/’,响应html页面，其中引入一个路径为/x的css文件，结束
  } else if (path === '/x') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)
    response.end()   //如果请求路径为‘/x’,响应css内容，结束
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()   //如果路径不对，响应该内容
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log(
  '监听 ' +
  port +
  ' 成功\nCtrl+鼠标单击打开 http://localhost:' +
  port
);

