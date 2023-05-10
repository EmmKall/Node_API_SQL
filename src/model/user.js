import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class User extends Model{};

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT( 12, 2 ),
        allowNull: false,
    },
    in_sotck: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize,
    modelName: 'users'
});

export default User;
