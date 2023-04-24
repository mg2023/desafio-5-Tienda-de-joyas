const {obtenerListadoJoyasbd} = require('../config/database')
 

// 1 .Crear una ruta GET /joyas que:
// a. Devuelva la estructura HATEOAS de todas las joyas almacenadas en la base
// de datos (1.5 puntos)
// b. Reciba en la query string los parámetros (2 puntos):
// i. limits: Limita la cantidad de joyas a devolver por página
// ii. page: Define la página
// iii. order_by: Ordena las joyas según el valor de este parámetro, ejemplo:
// stock_ASC
const obtenerListadoJoyas = async({limits = 10, order_by = 'id_ASC', page = 0}) => {

    //b. Reciba en la query string los parámetros (2 puntos):
    const resultado =  await obtenerListadoJoyasbd(limits, order_by, page)
    let resultado_final = []
    if ( resultado.length > 0 ){
        let results = []
        let stockTotal = 0
        resultado.forEach(element => {
            let objResultado = {
                'name' : element.nombre,
                'href' : `/joyas/joya/${element.id}`
            }
            stockTotal += element.stock
            results.push(objResultado)            
        });

        //estructura HATEOAS
        resultado_final = {
            'totalJoyas':resultado.length,
            'stockTotal': stockTotal,
            'results': results
        }

    }
    return resultado_final

}

module.exports = {obtenerListadoJoyas}