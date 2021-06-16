import { Body, Controller, Delete, Get, Param, Post, Put, HttpStatus, HttpCode } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags("User module")
@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService){}
    @ApiOperation({summary: "Get All Users"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAllUsers(): Promise<User[]>{
        return this.userService.getAllUsers();
    }  

    @Get('lang')
    getAllUsersWithLanguages(): Promise<User[]>{
        return this.userService.getAllUsersWithLanguage();
    } 

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: number): Promise<User>{
        return this.userService.getUserById(id)
    }

    @Get(':email')
    @HttpCode(HttpStatus.OK)
    getUserByEmail(@Param('email') email: string): Promise<User>{
        return this.userService.getUserByEmail(email)
    }

    @ApiOperation({summary: "Create User"})
    @ApiResponse({status: 200, type: User})
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
