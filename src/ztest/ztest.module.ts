import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ZtestController } from './ztest.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ZtestController],
})
export class ZtestModule { }
