import { UpdateArticleDto } from './dto/updateArticle.dto';
import { Injectable, HttpStatus, HttpException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article)
        private artRepo: Repository<Article>,
        private connection: Connection,
    ){}

    async createArticle(article: CreateArticleDto) {
        const newArticle = await this.artRepo
        .createQueryBuilder()
        .insert()
        .into(Article)
        .values(article)
        .execute()
        return newArticle;
    }

    async getAllArticles(): Promise<Article[]> { 
        const articles = await this.artRepo.createQueryBuilder("article")
        .select(["article.id", "article.title", "article.content", "user.firstName"])
        .leftJoin("article.user", "user")
        .getMany();
        return articles;
    }


    async getArticleById(id: number){
        const article = await this.artRepo
        .createQueryBuilder()      
        .select(["a.id","a.title", "a.content"])       
        .from(Article, "a")
        .where(`a.id = ${id}`)
        .getOne(); 
        return article;
    }

    async updateUser(id: number, updateArticleDto: UpdateArticleDto ){
        const queryRunner = this.connection.createQueryRunner(); 
        const article = await this.getArticleById(id);
        const fieldId = article?.id;      
        if(fieldId){
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {           
                await queryRunner.manager.createQueryBuilder()
                .update(Article).set(updateArticleDto).where(`id = ${id}`) 
                .execute()
                await queryRunner.commitTransaction();
            } catch (error) {
                await queryRunner.rollbackTransaction();
                throw new InternalServerErrorException();
            }
        }

}
async deleteArticle(id: number) {
    const queryRunner = this.connection.createQueryRunner();   
    const article = await this.getArticleById(id);
    const fileId = article.id;

    if (fileId) {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        await queryRunner.manager.update(Article, id, {
        ...article,
        title: null,
        content: null
        }); 
        await this.artRepo
        .createQueryBuilder()
        .delete()    
        .from(Article)
        .where(`id = ${id}`)
        .execute();    
        await queryRunner.commitTransaction();       
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException();
    } finally {
        await queryRunner.release();
    }
    }
}


}

