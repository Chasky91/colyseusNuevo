import { Router } from "express"
import {obtenerTodos, crear,modificar,obtenerUno, darDeBaja, loguin} from "../controllers/controllerJugador.js"

const routerJugador = Router()

routerJugador.get('/todos', obtenerTodos )
routerJugador.post('/nuevo', crear )
routerJugador.put('/actualizar/:id', modificar )
routerJugador.get('/uno/:id', obtenerUno )
routerJugador.delete('/baja/:id', darDeBaja )
routerJugador.post('/loguin', loguin)

export  default routerJugador