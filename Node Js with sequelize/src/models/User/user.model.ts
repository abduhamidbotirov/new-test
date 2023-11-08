// // user.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../db/localSequelize.js';


export const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});







// class User extends Model {
//     public id!: number;
//     public username!: string;
//     public email!: string;
// }

// User.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         username: DataTypes.STRING,
//         email: {
//             type: DataTypes.STRING,
//             unique: true,
//         },
//     },
//     {
//         sequelize,
//         modelName: 'Users',
//     }
// );

// export { User };


