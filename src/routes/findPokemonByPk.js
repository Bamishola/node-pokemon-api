const {Pokemon}  = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) =>{
    app.get('/api/pokemons/:id', auth, (req, res) =>{
        Pokemon.findByPk(req.params.id)
            .then(pokemon =>{
                if(pokemon === null){
                    const message = `Le pokemon demande n'existe pas. Ressayez avec un autre identifiant`
                    return res.status(404).json({message})
                }
                const message = 'Un pokemon a bien ete trouve'
                res.json({message, data: pokemon})
            })
            .catch(error => {
                const message = `Le pokemon n'a pu etre recupere. Ressayez dans queleques instants.`
                res.status(500).json({message, data: error})
            })
    })
}