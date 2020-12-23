import Server from './classes/server';
import router from './routes/router';
import cors from "cors";
import bodyParser from "body-parser";


// regresamos instancia de la clase con el get instance
const server = Server.instance 

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) )
server.app.use ( bodyParser.json() )

// CORS
// server.app.use( cors({ origin: true, credentials: true }) )

// rutas
server.app.use('/', router)

server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`)
})