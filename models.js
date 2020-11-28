const { Sequelize, DataTypes } = require('sequelize')

// configuration for database
const config = {
  host: 'localhost',
  dialect: 'postgresql',
}
const sequelize = new Sequelize(config)
const Accounts = sequelize.define(
  'accounts',
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    photo: DataTypes.STRING,
    // password: DataTypes.STRING(20)
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id', 'username', 'email'],
      },
    ],
  },
)

const Posts = sequelize.define('posts', {
  p_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  date: {
      type: DataTypes.DATE,
      allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Posts.belongsTo(Accounts, { foreignKey: 'author_id', foreignKeyConstraint: true })

/*sequelize.sync({ force: true }).then(() => {
  console.log('Friend model was synchronized successfully.')
})*/

module.exports = { Accounts, Posts }
