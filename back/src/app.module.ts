import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeiaController } from './routes/idea/ideia.controller';
import { OpenaiService } from './routes/idea/openai.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 60,
          limit: 10,
        },
        {
          name: 'medium',
          ttl: 300,
          limit: 20,
        },
        {
          name: 'long',
          ttl: 600,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [AppController, IdeiaController],
  providers: [AppService, OpenaiService],
})
export class AppModule {}
