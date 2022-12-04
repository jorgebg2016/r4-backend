import { Model, Optional, STRING, INTEGER } from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
    id: string;
    name: string;
    email: string;
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
  }
);

export default User;