// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns

    // CODE TO CREATE THE INITIAL PRODUCT MODEL - CAN BE EXTENDED and expanded upon
    id: {
      type: DataTypes.INTEGER,
      alowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      }
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },

    category_id: {
      type: DataTypes.INTEGER,

      // setting allowNull to TRUE allows us to delete a category - setting to false for stock, price, product_name, and of course Id
      allowNull: true,

      references: {
        model: "category",
        key: "id",
      }
    }
  },
  
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
