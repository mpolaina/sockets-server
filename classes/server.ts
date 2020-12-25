
import express from 'express'
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'
import http from 'http'
import * as socket from '../sockets/sockets';

export default class Server {
    
    private static _instance: Server
    
    public app: express.Application
    public port: number
    
    public io: socketIO.Server
    private httpServer: http.Server
    
    private constructor() {
        
        this.app = express()
        this.port = SERVER_PORT
        
        this.httpServer = new http.Server( this.app )
        // io es el servidor de sockets
        this.io= new socketIO.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
              },            
          });
        
        this.escucharSockets()
        
    }
    
    public static get instance() {
        return this._instance || ( this._instance = new this() )
    }
    // con static lo llamamos referenciando a la clase
    // crea una instancia y si no existe una nueva (new this = new server)
    
    private escucharSockets(){
        
        console.log('Escuchando conexiones - sockets')
        // Conexión de un cliente
        this.io.on('connection', cliente => {
            
            
            socket.configurarUsuario( cliente, this.io ) // Configurar usuario
            
            socket.conectarCliente( cliente, this.io ) // Conectar cliente
            
            socket.obtenerUsuarios( cliente, this.io) // Obtener usuarios activos
              
            socket.mensaje( cliente, this.io ) // Escuchar Mensajes
              
            socket.desconectar( cliente, this.io ) // Escuchar Desconectar
              
        })
    }
    
    start( callback: any ) {
        
        this.httpServer.listen( this.port, callback )
    }
}