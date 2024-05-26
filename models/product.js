import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import User from "./user.js";

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});


Product.belongsTo(User, { foreignKey: 'userId' });

export default Product
