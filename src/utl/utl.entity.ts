import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Language from "../language/language.entity";
import User from "../user/user.entity";

@Entity()
export class utl {
    @PrimaryGeneratedColumn()
    public userToLanguageId: number;
    @Column()
    public userId: number;
    @Column()
    public languageId:number;

    @ManyToOne(type=> User, user => user.utl)
    public user!:User;

    @ManyToOne(type=> Language, language => language.utl)
    public language!: Language;

}

export default utl;