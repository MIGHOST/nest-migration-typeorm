import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}

    @Get()
    getAllUsers(): Promise<User[]>{
        return this.userService.getAllUsers();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: number): Promise<User>{
        return this.userService.getUserById(id)
    }

    @Post()
    async createUser (@Body() user: CreateUserDto){
        return this.userService.createUser(user)
    }

    @Put(':id')
    async updateUser(@Param('id') id:number, @Body() user: UpdateUserDto ) {
        return this.userService.updateUser((id), user)
    }
    
    @Delete(':id')
    async deleteUser(@Param('id') id:number){
        this.userService.deleteUser(id)
    }

}
