import { Table, Model, AllowNull, Column } from 'sequelize-typescript';

@Table
export class Games extends Model {
    @AllowNull(false)
    @Column
    id_game!: string;

    @Column
    name!: string;

    @Column
    description!: string;

    @Column
    end_date!: Date;
}
