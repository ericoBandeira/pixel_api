import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Pixel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    olho: string;

    @Column()
    cor: string;

    @Column()
    alimentado: Date;
}
