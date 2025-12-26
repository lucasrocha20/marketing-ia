import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeiaController } from './routes/idea/ideia.controller';
import { OpenaiService } from './routes/idea/openai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, IdeiaController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
