import { json } from 'express'
import  modelJugador from '../models/modelJugador.js'  

const crear = async (req, res) => {

    const nombre = req.body.nickname
    const mail = req.body.mail
    const contrasenha = req.body.contrasenha


    const result = await modelJugador.crear(nombre,mail,contrasenha)

    res.json(result)

}

const  obtenerTodos = async (req, res) => {       
    const  usuarios = await modelJugador.todos()
    res.json(usuarios)
}

const  loguin = async (req,res)=>{

    
    const  mail =  req.body.mail
    const password = req.body.password
    const [result]= await modelJugador.autenticar(mail)

    console.log(result)
    if ( result.length === 0) {
        console.log("ingreso  al if");

        return res.status(401).json({
            "message": "El correo  ingresado   no  existe"
        })
    }
    const emailJugador = result[0].mail
    const passDB  =result[0].contrasenha

    if(emailJugador === mail && passDB ===password) {
        console.log("loguin  exitoso")
        return res.json("loguin  exitoso")
    }

}


const  modificar = async (req, res) => {
    const id = req.params.id

    const nickname = req.body.nickname
    const  mail = req.body.mail
    const contrasenha = req.body.contrasenha

    const datos = {
        nickname,
        mail,
        contrasenha
    }

    const resultadoActualizar = await modelJugador.actualizar(datos, Number(id))

    if (resultadoActualizar.affectedRows === 0) {
        res.status(404).json({ error: 'Jugador no encontrado' })
        return
    }

    const jugadorActualizado = await modelJugador.buscarUno(Number(id))

    res.json(
        jugadorActualizado
    )
} 

const  obtenerUno = async (req, res) => {
    const  jugador_id = Number(req.params.id)
    const  resultado = await modelJugador.buscarUno(jugador_id)
    res.json(resultado)
}


const  darDeBaja = async (req, res) => {
    const  jugador_id = Number(req.params.id)
    const  resultado = await modelJugador.eliminar(jugador_id)
    res.json(resultado)
}




export { 
    obtenerTodos, 
    crear,
    modificar,
    obtenerUno,
    darDeBaja,
    loguin
}