const express = require('express')
const {obtenerJoyasConFiltrobd} = require('./config/database')

const app = express()

const middleware = require('./config/middleware');
const { obtenerListadoJoyas }  = require('./src/controllers');

// Use middleware
// 3. Hacer uso de los middlewares como capa de reporte en cada una de las rutas.
// (1 puntos)
middleware(app)

app.listen(3000, console.log("¡Servidor encendido!"))


// 1. Crear una ruta GET /joyas
app.get("/joyas", async (req, res) => {
    const queryStrings =req.query
    const ans = await obtenerListadoJoyas(queryStrings)
    console.log(ans)
    if (ans != 500){
        res.json(ans)
    }
    else{
        res.sendStatus(ans)
    }  
})


// 2. Crear una ruta GET /joyas/filtros que reciba los siguientes parámetros en la query
// string: (3.5 puntos)
app.get("/joyas/filtros", async (req, res) => {
    const queryStrings =req.query
    const ans = await obtenerJoyasConFiltrobd(queryStrings)
    console.log(ans)
    if (ans != 500){
        res.json(ans)
    }
    else{
        res.sendStatus(ans)
    }  
})