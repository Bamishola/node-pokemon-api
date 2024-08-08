const { User } = require("../db/sequelize")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.body.username } }).then(user => {
            if (!user) {// si l'uitisateur n'est pas trouve
                const message = `L'utilisateur demandé n'existe pas`
                return res.status(404).json({ message })
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {// si le mot de passe est invalid
                    const message = `Le mot de passe est incorrect.`
                    return res.status(401).json({ message })
                }
                
                // JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                )

                const message = `L'utilisateur a ete connecté avec succes`
                return res.json({ message, data: user, token})
            })
        })
            .catch(error => { //erreur de reseau
                const message = `L'utilisateur n'a pas pu etre connecté. Reessayez dans quelques instants`
                return res.json({ message, data: error })
            })
    })
}