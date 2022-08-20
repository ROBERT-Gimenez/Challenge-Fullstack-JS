const { move } = require("../app");

const toThousand = n => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");}
/* const db = require('../database/models')
 */
module.exports = {
    index: (req, res)=> {
          res.render('home' ,{
            title:"move",
			toThousand,
            })  
        }
        
    }
