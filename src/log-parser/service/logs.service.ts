import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class LogsService {

    processFile(file: Express.Multer.File) {
        if(!file){
            throw new HttpException("File Not Found", HttpStatus.BAD_REQUEST);
        }
        try {
            
            const fileData = fs.readFileSync(file.path, 'utf8');
            const parseFileIntoArray = fileData.split("\n");
            //Parsing each line into array
            const parseItemIntoArray = parseFileIntoArray.map(item => item.split(" - "));
            let responseData = [];

            //Filtering error log data & creating response obj 
            parseItemIntoArray.forEach(item => {
                if (item[1] === 'error') {
                    let resItem = {
                        timestamp: item[0],
                        loglevel: item[1],
                        transactionId: JSON.parse(item[2]).transactionId,
                        err: JSON.parse(item[2]).err
                    };
                    responseData.push(resItem);
                }
            })
            
            return {
                data: responseData,
                success: true,
                message: "File successfully uploaded !!"
            }
        } catch (error) {
            throw new HttpException("Error In Uploading", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
