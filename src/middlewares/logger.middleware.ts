import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log('>>>logger.middlerware Before');
        next();
        console.log('>>>logger.middlerware After\n\r');
    }
}

// export function logger(req, res, next) {
//     console.log(`Request...`);
//     next();
// }
