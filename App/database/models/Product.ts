import { Model, Optional, STRING, INTEGER } from 'sequelize';
import { sequelize } from '.';

interface ProductAttributes {
    id: string;
    name: string;
    category_id: number;
}

interface ProductCreationAttributes
    extends Optional<ProductAttributes, 'id'> {}

interface ProductInstance
    extends Model<ProductAttributes, ProductCreationAttributes>,
        ProductAttributes {
            createdAt?: Date;
            updatedAt?: Date;
        }

const Product = sequelize.define<ProductInstance>('Product', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: INTEGER,
      unique: true,
    },
    name: {
      allowNull: false,
      type: STRING,
    },
    category_id: {
        allowNull: false,
        type: INTEGER,
    },
  }
);


export default Product;