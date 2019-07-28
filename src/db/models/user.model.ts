/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import {
    Model, Column, Table, AutoIncrement, DataType, PrimaryKey, BeforeCreate, BeforeUpdate,
} from 'sequelize-typescript';

import * as bcrypt from 'bcrypt';

@Table({
    modelName: 'User',
    timestamps: true,
    tableName: 'User',
    freezeTableName: true,
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        validate: {
            notEmpty: true,
        },
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    })
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static hashPassword(user: User): void{
        const salt = bcrypt.genSaltSync(10);
        user.set('password', bcrypt.hashSync(user.password, salt));
    }
}

export default function (sequelize, DataTypes): User {
    return new User();
}
