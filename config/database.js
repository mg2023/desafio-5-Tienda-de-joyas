const format =require('pg-format')
const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'ok',
    database: 'joyas',
    allowExitOnIdle: true
})

const obtenerListadoJoyasbd = async (limits, order_by, page) => {
//4. Usar try catch para capturar los posibles errores durante una consulta y la lógica de
// cada ruta creada. (1 puntos)
    try{
        let [ campo, direccion ] = order_by.split('_')
        direccion = direccion.toUpperCase()
        const offset =  ( page - 1) * limits 
        const formattedQuery = format('SELECT id, nombre, stock FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',campo, direccion,limits, offset)
        const { rows } = await pool.query(formattedQuery)
        return rows 
    }
    catch{
        //bad request
        console.log('bad request')
        return(400)
    }    
}


const obtenerJoyasConFiltrobd = async ({precio_max, precio_min, categoria, metal}) => {

//4. Usar try catch para capturar los posibles errores durante una consulta y la lógica de
// cada ruta creada. (1 puntos)
    try{
         
        let filtros = []
        const values = []


// 5. Usar las consultas parametrizadas para evitar el SQL Injection en la consulta a la
// base de datos relacionada con la ruta GET /joyas/filtros (1 puntos)
        const agregarFiltro = (campo, comparador, valor) => {
            values.push(valor)
            const { length } =  filtros
            filtros.push(`${campo} ${comparador} $${length + 1}`)
        }

        if (precio_max) agregarFiltro('precio', '<=',precio_max)
        if (precio_min) agregarFiltro('precio', '>=' , precio_min)
        if (categoria) agregarFiltro('categoria', '=' ,categoria)
        if (metal) agregarFiltro('metal', '=', metal)

  
        let consulta = "SELECT * FROM inventario"
        if (filtros.length > 0) {
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
        }
        const { rows: joyas } = await pool.query(consulta, values)

        return joyas
    }
    catch{
        //bad request
        console.log('bad request')
        return(400)
    }    
}



module.exports = {  obtenerListadoJoyasbd , obtenerJoyasConFiltrobd }