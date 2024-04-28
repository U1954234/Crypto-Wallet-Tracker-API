import app from '../index'
import { normalizePort, onError, onListening } from '../utilities/helpers'
import http from 'http'
import authRouter from '../routes/authRouter'
import dashboardRouter from '../../src/routes/dashboardRouter'
var port = normalizePort(process.env.PORT || "3000")
app.set('port',port)
var server = http.createServer(app);
//ROUTES
app.use("/auth",authRouter)
app.use("/user",dashboardRouter)


server.listen(app.get('port'), async ()=>{
    try { 
      console.log('server running on port:'+app.get('port'))
    } catch (error) {
      console.log(error);
    }
  });

server.on('error', onError);
server.on('listening', onListening);