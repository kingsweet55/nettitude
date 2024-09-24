import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { DatabaseModule } from './database/database.module';
import { PostModule } from './post/post.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { StoreModule } from 'store/store.module';
import { ZtestModule } from 'ztest/ztest.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true }),
    DatabaseModule,
    PostModule,
    AuthModule,
    UserModule,
    SendgridModule,
    StoreModule,
    ZtestModule,
    LoggerModule.forRoot(),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
