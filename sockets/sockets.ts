import { Socket } from 'socket.io';
import * as socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

// Instancia de usuarios conectados
export const usuariosConectados = new UsuariosLista()

export const conectarCliente = ( cliente: Socket, io: socketIO.Server) => {
       // Nueva instancia de usuario
       const usuario = new Usuario( cliente.id )
       usuariosConectados.agregar( usuario )
}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('disconnect', () => {    
    
        usuariosConectados.borrarUsuario( cliente.id )
        io.emit( 'usuarios-activos', usuariosConectados.getLista() )
    })
}

// escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => { 
    
        console.log( 'Mensaje recibido', payload )
        io.emit( 'mensaje-nuevo', payload ) 
    })
}

// configurar usuario
export const configurarUsuario = ( cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {
    
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre )
        io.emit( 'usuarios-activos', usuariosConectados.getLista() )
        callback({
           ok: true,
           mensaje: `Usuario ${ payload.nombre } configurado`
        })        
    })
}

// OBTENER USUARIOS
export const obtenerUsuarios = ( cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('obtener-usuarios', () => {
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() )
    })
}
