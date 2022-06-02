import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsController } from './log-parser/controller/logs.controller';
import { LogsService } from './log-parser/service/logs.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [AppController, LogsController],
  providers: [AppService, LogsService],
})
export class AppModule { }
