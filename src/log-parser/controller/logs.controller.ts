import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LogsService } from '../service/logs.service';

@Controller('logs')
export class LogsController {
    constructor(private logService: LogsService){ }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadLog(@UploadedFile() file : Express.Multer.File): any {
    
      
      return this.logService.processFile(file);

    }
}
