import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Equipe {

    @PrimaryGeneratedColumn()
    id: number;

}
