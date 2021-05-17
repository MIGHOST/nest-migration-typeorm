import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UtlService } from './utl.service';
import { UtlController } from './utl.controller';
import utl from './utl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([utl])],
  providers: [UtlService],
  controllers: [UtlController]
})
export class UtlModule {}
