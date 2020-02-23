import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MyLogger } from 'libs/mylog.service';
import { Request } from 'express';

/**
 * 守卫在每个中间件之后，管道之前执行
 * TODO 使用jwt校验接口权限
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger: MyLogger;
    constructor(){
        this.logger = new MyLogger('auth.guard.ts');
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        this.logger.log('auth.guard验证');
        
        const request = context.switchToHttp().getRequest<Request>();
        console.log(request.cookies);
        const token =request.cookies['token']
        this.logger.debug(token);
        const auth: boolean = !!Boolean(token);
        this.logger.log('auth.guard守卫验证结果：' + (auth ? '通过' : '不通过'));
        return auth;
    }
}
