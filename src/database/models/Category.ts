import { Model, Optional, STRING, INTEGER } from 'sequelize';
import { sequelize } from '../../config/database.config';
import Product from './Product';

interface CategoryAttributes {
    id: number;
    name: string;
}

interface CategoryCreationAttributes
    extends Optional<CategoryAttributes, 'id'> {};

interface CategoryInstance
    extends Model<CategoryAttributes, CategoryCreationAttributes>,
        CategoryAttributes {
            createdAt: Date;
            updatedAt: Date;
        };

const Category = sequelize.define<CategoryInstance>('Category', {
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
  }, {
    tableName: 'categories',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
        beforeCreate: (category: any) => {
            category.createdAt = new Date();
            category.updatedAt = new Date();
        },
        beforeUpdate: (category: CategoryInstance) => {
            category.updatedAt = new Date();
        }
    },
  }
);


Category.hasMany(Product);

export {
    Category,
    CategoryInstance,
    CategoryAttributes,
    CategoryCreationAttributes
};