import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import User from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
        ){}

    async createUser(user: CreateUserDto) {
        const newUser = await this.userRepo
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(user)
        .execute()
        return newUser
}
async getAllUsers(): Promise<User[]> {
    const users = await this.userRepo
    .createQueryBuilder("u")
    .select([
        'u.id',
        'u.email',
        'u.firstName',
        'u.login',
        'u.age',
        'a.id',
        'a.title',
        'a.content',
        'a.userId',
        'c.id',
        'c.name',
        'c.abbreviation',
        'c.capital'
         ])
    .leftJoin("u.article", "a")
    .leftJoin("u.country", "c")
    .getMany(); 
    return users;
}

async getUserByEmail(email: string) {
        const user = await this.userRepo.findOne({email});
        if(user){
            return user;
        }
        throw new HttpException(`User with ${email} does not exist`, HttpStatus.NOT_FOUND);
}
    
    async getUserById(id: number){
    const user = await this.userRepo
    .createQueryBuilder()
    // .leftJoinAndSelect("user.country", "country")
    .select(["u.id","u.email", "u.firstName", "u.login"])       
    .from(User, "u")
    .where(`u.id = :id`, {id: 1})
    .getOne(); 
    return user;
}
    async updateUser(id: number, updateUser: UpdateUserDto ){
        await this.userRepo.update(id, updateUser)
        const updatedUser = await this.userRepo.createQueryBuilder()
        .update(User).set(updateUser).where(`id = ${id}`) 
        .execute() 
        if(updatedUser){
        return updatedUser
        }
        throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
    async deleteUser(id:number){
        const deleteResponse = await this.userRepo
        .createQueryBuilder()
        .delete()    
        .from(User)
        .where(`id = ${id}`)
        .execute();      
        
        if(!deleteResponse){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
    }
}

    // async updateUser(id: number, updateUser: UpdateUserDto ){
    //     await this.userRepo.update(id, updateUser)
    //     const updatedUser = await this.userRepo.findOne(id);
    //     if(updatedUser){
    //     return updatedUser
    //     }
    //     throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    // }

        // async deleteUser(id:number){
    //     const deleteResponse = await this.userRepo.delete(id)
    //     if(!deleteResponse){
    //     throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    //     }
    // }

    
//     async getUserById(id: number){
//     const user = this.userRepo.findOne(id);
//     if(user)return user;
//     throw new HttpException('User not found', HttpStatus.NOT_FOUND)
// }

    // getAllUsers(): Promise<User[]> {return this.userRepo.find()}

    // async createUser(user: CreateUserDto) {
    //     const newUser = await this.userRepo.create(user);
    //     await this.userRepo.save(newUser);
    //     return newUser;