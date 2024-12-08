// src/models/User.ts

import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Schedule } from './schedule.model';

@Table({ tableName: 'users', paranoid: true, timestamps: true })
export class User extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare password: string;

    @HasMany(() => Schedule)
    schedules?: Schedule[];

}
