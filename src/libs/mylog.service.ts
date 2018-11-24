import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {
    error(message: string, trace: string) {
        // add your custom business logic
        console.log(">>>>>>>log");
        
        super.error(message, trace);
    }
}