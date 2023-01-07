const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {

    // define columns

    // setting up auto-ID will be a very similar process every time
    // setting up models in general will follow a lot of the same rules every time
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },


  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
