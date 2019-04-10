import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log('>>>logger.middlerware Before');
        console.time('time count')
        next();
        console.log('>>>logger.middlerware After\n\r');
        console.timeEnd('time count')
    }
}

// export function logger(req, res, next) {
//     console.log(`Request...`);
//     next();
// }
