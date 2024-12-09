import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Job } from './job.model';

@Table({ tableName: 'failed_jobs', timestamps: false })
export class FailedJob extends Model {

    @ForeignKey(() => Job)
    @Column({
        type: DataType.INTEGER,
    })
    declare job_id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    declare errorMessage: string;

}
