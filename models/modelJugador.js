import pool from  '../config.db.js'

const  todos = async () => {
    const  result = await pool.execute('SELECT * FROM jugador')
    return result[0]
}

const  crear = async (nickname, mail, contrasenha) => {

    const result = await pool.execute(
        'INSERT INTO jugador (nickname, mail, contrasenha) VALUES (?, ?, ?)', 
        [nickname, mail, contrasenha]
    )
    const id_jugador= result[0].insertId
    const  nuevo = await buscarUno(id_jugador)
    return nuevo
}

const buscarUno = async (id) => {
    console.log(typeof id)
    const  result = await pool.execute('SELECT * FROM jugador WHERE id_jugador = ?', [id])
    console.log(result);
    
    return result[0]
}

const actualizar = async (datos, id) => {
    console.log(datos)
    const  result = await pool.execute(
        'UPDATE jugador  SET nickname = ?, mail = ?, contrasenha = ? WHERE id_jugador = ?', 
        [datos.nickname, datos.mail, datos.contrasenha, id]
    )
    return result[0]
}

const  eliminar = async (id) => {
    const  result = pool.execute(' DELETE FROM jugador WHERE  id_jugador = ? ', [id])
    return result[0]
}

const autenticar = async(mail) =>{
    return await pool.execute(
                'SELECT * FROM jugador WHERE mail = ?' ,  [mail ] )
    
}

export default   {
    crear,
    todos,
    buscarUno,
    actualizar,
    eliminar,
    autenticar
}