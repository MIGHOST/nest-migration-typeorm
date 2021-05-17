import { UpdateArticleDto } from './dto/updateArticle.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import User from 'src/user/user.entity';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ){}

    @Get()
    getAllArticles(): Promise<Article[]>{
        return this.articleService.getAllArticles();
    }
    @Get(':id')
    getArticleById(@Param('id') id:number): Promise<Article>{
        return this.articleService.getArticleById(id);
    }

 
    @Post()
    async createArticle(@Body() article: CreateArticleDto){
        return this.articleService.createArticle(article)
    }

    @Put(':id')
    async updateArticle(@Param('id') id:number, @Body() article: UpdateArticleDto ) {
        return this.articleService.updateUser((id), article) 
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id:number){
        this.articleService.deleteArticle(id)
    }
}
