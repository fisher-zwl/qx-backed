const http =require('http')
const app=require('./router')


let PORT='7800'
let port = process.env.PORT || PORT;
app.set('port', port);

let server = http.createServer(app);

server.listen(port,function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});


