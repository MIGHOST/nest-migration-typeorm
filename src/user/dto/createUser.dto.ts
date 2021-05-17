import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({example:"newUser@mail.com", description:"User e-mail"})
    email: string;
    @ApiProperty({example:"New User", description:"User name"})
    firstName: string;
    password: string;
}

export default CreateUserDto;