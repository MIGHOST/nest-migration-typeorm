import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import User from './user/user.entity';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { configService } from './config/config.service';
import { CountryModule } from './country/country.module';
import { LanguageModule } from './language/language.module';
import { UtlModule } from './utl/utl.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    configService.getTypeOrmConfig(),
    
  ), 
  ConfigModule.forRoot({
    validationSchema: Joi.object({   
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION_TIME: Joi.string().required(),
    })
  }), UserModule, CountryModule, ArticleModule, LanguageModule, UtlModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
