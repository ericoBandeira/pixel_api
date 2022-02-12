import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Notas {

    @PrimaryGeneratedColumn()
    nome: number;

    @Column()
    valor: string;

    @Column()
    able: boolean;

}
