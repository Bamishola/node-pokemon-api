/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize') //import de l'ORM sequelize pour interagir avec la base de donnees
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

// connexion a la base de donnees
const sequelize = new Sequelize(
    'pokedex', //database name
    'root', //id to access database. defalt value : root
    '', // password of database
    {
        host: 'localhost', // place of dataset
        dialect: 'mariadb', // driver name
        //don't display error logs in terminal
        dialectOptions: {
            timezone: 'Etc/GMT-1'
        },
        logging: false
    }
)
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {
        pokemons.map(pokemon => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types
            }).then(pokemon => console.log(pokemon.toJSON()))
        })

        bcrypt.hash('loke', 10)
            .then(hash => {
                User.create({
                    username: 'loke',
                    password: hash
                }).then(user => console.log(user.toJSON()))
            })

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Pokemon, User
}