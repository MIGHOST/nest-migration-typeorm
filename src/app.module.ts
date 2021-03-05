import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from './user/user.entity';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { configService } from './config/config.service';
import { CountryModule } from './country/country.module';


@Module({
  imports: [TypeOrmModule.forRoot(
    configService.getTypeOrmConfig()
  ), UserModule, CountryModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
