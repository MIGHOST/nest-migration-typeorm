import { createUTL } from './dto/createUserToLanguage.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UtlService } from './utl.service';
import UTL from './utl.entity';

@Controller('utl')
export class UtlController {
    constructor(private readonly utlService: UtlService){}
    @Get()
    getAllRelationships(): Promise<UTL[]>{
        return this.utlService.getAllRelationships()
    }
    @Post()
    async createNewRelationship(@Body() utl: createUTL) {
        return this.utlService.creatNewRelationship(utl)
    }
}
