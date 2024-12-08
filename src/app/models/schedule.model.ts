// src/models/User.ts

import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { Activity } from './activity.model';

@Table({ tableName: 'schedules', paranoid: true, timestamps: true })
export class Schedule extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    declare url: string;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => Activity)
    activities!: Activity[];
}
