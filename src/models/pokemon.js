/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Le nom est deja pris"
      },
      validate: {
        notNull: { msg: `Le nom est une propriete requise.` },
        notEmpty: { msg: `Le nomne peut pas etre vide` },
        max: {
          args: [10],
          msg: `Cette chaine de caractere est fermee,...`
        }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `Utiliser uniquement des nombres entiers pour les points de vie.` },
        notNull: { msg: `Les points de vie sont une propriete requise.` },
        min: {
          args: [0],
          msg: `Les points de vie doivent etre superieur ou egal a 0`
        },
        max: {
          args: [999],
          msg: `Les points de vie doivent etre inferieurs ou egal a 999`
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `Utiliser uniquement des nombres entiers pour les points de degats.` },
        notNull: { msg: `Les points de degats sont une propriete requise.` },
        min: {
          args: [0],
          msg: `Les points de degats doivent etre superieur ou egal a 0`
        },
        max: {
          args: [99],
          msg: `Les points de degats doivent etre inferieurs ou egal a 99`
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: `Utiliser uniquement une URL valide pour l'image` },
        notNull: { msg: `L'image est' une propriete requise.` }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypeValid(value) {
          if (!value) {
            throw new Error("Un pokemon doit avoir au moin un type.")
          }
          if (value.split(',').length > 3) {
            throw new Error("Un pokemon ne peux pas avoir plus de trois types");

          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)){
              throw new Error(`Le typ d'un pokemon doit appartenir a la liste suivante : ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}