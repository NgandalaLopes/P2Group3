const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { auth, requiresAuth } = require('express-openid-connect');

class User extends Model {
    checkPassword(loginPw) {
      return ;// NEED TO ADD RETURN INFO BASED ON AUTH0 DOCUMENTATION
    }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

