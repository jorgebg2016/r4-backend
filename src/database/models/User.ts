import { Model, Optional, STRING, INTEGER } from 'sequelize';
import { sequelize } from '../../config/database.config';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes
    extends Optional<UserAttributes, 'id'> {}

interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
            createdAt?: Date;
            updatedAt?: Date;
        }

const User = sequelize.define<UserInstance>('User', {
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
    email: {
      allowNull: false,
      type: STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: STRING,
    },
  }, {
    tableName: 'users'
  }
);

export {
  User, 
  UserAttributes,
  UserInstance,
  UserCreationAttributes
};