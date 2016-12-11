let bdd = require("../config/bd.js")

class indexHpHc {

    static create (hc,hp){
        bdd.query("INSERT INTO index SET hc = ?, hp = ?, created_at = ?",[hc, hp, new Date()], (err, result)=> {
            if(err) throw err

            cb(result)
        })
    }
}
module.exports = indexHpHc