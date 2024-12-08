import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Schedule } from './schedule.model';

@Table({ tableName: 'activities', paranoid: true, timestamps: true })
export class Activity extends Model {

    @ForeignKey(() => Schedule)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare schedule_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.TEXT,
    })
    declare description: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare start_date: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    declare end_date: Date;

    @BelongsTo(() => Schedule)
    schedule!: Schedule;
}
