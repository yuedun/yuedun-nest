import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * 守卫在每个中间件之后，管道之前执行
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('>>>auth.guard');
        
        const request = context.switchToHttp().getRequest();
        let auth:boolean = !!Number(request.query.auth);
        
        return auth;
    }
}