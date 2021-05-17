import { createUTL } from './dto/createUserToLanguage.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utl from './utl.entity';

@Injectable()
export class UtlService {
    constructor(
        @InjectRepository(Utl)
        private utlRepo: Repository<Utl>
    ){}

    async getAllRelationships(): Promise<Utl[]> {
    
        return this.utlRepo.find();
    }

    async creatNewRelationship(utl: createUTL){
        const newRelationship = await this.utlRepo
        .createQueryBuilder()
        .insert()
        .into(Utl)
        .values(utl)
        .execute()
        return newRelationship;
    }
}
