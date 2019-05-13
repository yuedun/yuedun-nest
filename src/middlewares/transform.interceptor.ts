import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    code: number;
    data: T;
    message: string;
}

/**
 *    在函数执行之前/之后绑定额外的逻辑
    转换从函数返回的结果
    转换从函数抛出的异常
    扩展基本函数行为
    根据所选条件完全重写函数 (例如, 缓存目的)
 *
 * @export
 * @class TransformInterceptor
 * @implements {NestInterceptor<T, Response<T>>}
 * @template T
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        console.log('>>>trasform.interceptor');

        return next.handle().pipe(
            map(data => ({
                code: 0,
                data,
                message: '',
            }))
        );
    }
}
