import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

import config from '../config';

let setting = config[env];

const  sequelize = new Sequelize(setting.database, setting.username, setting.password, setting);

export { Sequelize, sequelize };

