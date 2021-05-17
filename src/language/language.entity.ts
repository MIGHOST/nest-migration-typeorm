// import { UserToLanguage } from '../user-to-language/userToLang.entity';
import { User } from '../user/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'; 
import utl from '../utl/utl.entity';
@Entity()
class Language {
  @PrimaryGeneratedColumn()
  public id: number; 
  @Column()
  public name: string;
  @ManyToMany(type=> User, user => user.language)
  user: User[];
  @OneToMany (type=> utl, utl => utl.language)
  public utl!: utl[];
} 
export default Language;