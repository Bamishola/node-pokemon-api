const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = process.env.PORT || 5000


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json("Hello, Heroku Bamishola")
})

//Ici nous placerons dos futurs point de terminaison.
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)


//ajouter la gestion des erreurs
app.use(({res}) => {
    const message = `Impossible de trouver la ressource ! Vous pouver essayer une autre URL.`
    res.status(404).json({message})
})


app.listen(port, () => console.log(`Notre application est accessible a l'adresse http://localhost:${port}`))
