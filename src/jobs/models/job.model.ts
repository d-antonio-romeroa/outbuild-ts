import { Table, Column, Model, DataType, HasMany, ForeignKey } from 'sequelize-typescript';
import { User } from '../../app/models/user.model';

@Table({ tableName: 'jobs', timestamps: true })
export class Job extends Model {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    declare user_id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare handler: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
    })
    declare payload: object;

    @Column({
        type: DataType.ENUM('pending', 'processing', 'completed', 'failed'),
        defaultValue: 'pending',
    })
    declare status: 'pending' | 'processing' | 'completed' | 'failed';

}
