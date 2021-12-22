import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GiftGateway } from './websocket/gift.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [AppService, GiftGateway],
})
export class AppModule {}
