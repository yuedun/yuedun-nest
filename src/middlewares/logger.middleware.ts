import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    resolve(...args: any[]): MiddlewareFunction {
        console.log('>>>logger.middlerware');
        return (req, res, next) => {
            console.log('>>>logger.middlerware Before');
            next();
            console.log('>>>logger.middlerware After');
            
        };
    }
}

// export function logger(req, res, next) {
//     console.log(`Request...`);
//     next();
// }