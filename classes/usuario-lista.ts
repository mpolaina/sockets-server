import { Usuario } from './usuario';

export class UsuariosLista {
    
    private lista: Usuario[] = []
    
    constructor(){}
    
    // métodos
    public agregar ( usuario: Usuario ){
        
        this.lista.push( usuario )
        console.log(this.lista)
        return usuario // nos retorna el usuario que ha sido creado
    }
    
    public actualizarNombre( id: string, nombre: string ) {
        
        for( let usuario of this.lista ) {
            
            if( usuario.id === id ){
                usuario.nombre = nombre
                break // para salir del ciclo for
            }
        }
        
        console.log('=== Actualizando usuario ===')
        console.log(this.lista)
    }
    
    // obtener lista de usuarios
    public getLista() {
        
        return this.lista
    }
    
    // obtener un usuario
    public getUsuario( id: string ) {
        
        return this.lista.find( usuario => usuario.id === id )
    }
    
    // obtener un usuario en una sala concreta
    public getUserSala( sala: string ) {
        
        return this.lista.filter( usuario => usuario.sala === sala )
    }
    
    // Borrar un usuario
    public borrarUsuario( id: string ) {
        
        const tempUsuario = this.getUsuario( id )
        this.lista = this.lista.filter( usuario => usuario.id !== id )
        return tempUsuario // nos indica que usuario ha sido borrado
    }
    
    
}